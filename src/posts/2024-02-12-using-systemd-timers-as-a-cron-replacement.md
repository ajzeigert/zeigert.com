---
title: Using systemd timers as a cron replacement
date: '2024-02-12'
tags:
  - Linux
  - Cron
  - Systemd
metas:
    image: /img/timers/service-timer.png
comments:
    src: https://mastodon.social/@zeigert/111921097727927870#.
---

![Screenshot of result of running systemctl status for a systemd timer.](/img/timers/service-timer.png)

I recently decided to upgrade an old utility instance on AWS from Amazon Linux 2 to Amazon Linux 2023. This was mostly easy, as the linux flavors are very similar, however…

Cron is not installed by default on Amazon Linux 2023, and AWS recommends using `systemd` to run scheduled tasks instead of using `cron`. So I decided to learn how to do that.

<!-- more -->

The basic need: Make daily backups of several Postgres databases hosted on RDS and push those backup files to S3, then perform some rolling backup management on S3.[^1]

[^1]: Yes, I also use the built-in snapshot functionality of RDS, but I want easy dump files that can be restored quickly to a dev environment for troubleshooting.)

The existing server used cron to do this. Here’s an example crontab:

```sh
CRON_TZ=PST
@midnight $HOME/postgresql_auto_backup_s3/pg_backup_rotated.sh -c $HOME/postgresql_auto_backup_s3/app_backup.config >> $HOME/psql2s3_logs/backup.log 2>&1
```

And it has worked well for years! So why change? Well, using `cron` on AL2023 is possible, but it requires some unofficial packages that could break or be difficult to maintain. Since there was going to be learning involved either way, why not use the recommended way?

Although my setup was specific to my postgres backup jobs, I'm going to demonstrate a generic implementation below.

## System services overview

This post assumes the reader is already somewhat familiar with `systemd` and `systemctl`. I'm an amateur myself, so I'll explain as simple as I know how. `systemd` does a [bunch of things](https://en.wikipedia.org/wiki/Systemd), but I think of it as being responsible for setting up the system when it boots by mounting disks, starting services, etc.

`systemctl` is a command for creating and managing **services**, which can be just about anything. In our example case, it will be a single bash script.

Another use case for a service is to run Node on a production server. Two advantages of running Node as a service is that `systemd` will restart the service if it crashes and maintain logs.

The example services below will be "oneshot" services, i.e. they will be called and run when needed, not left running all the time.

Services are defined using _unit files_, which are generally stored in `/etc/systemd/system`.

## Setup

For this tutorial, I'll be using a clean Ubuntu 22.04.3 running via [multipass](https://github.com/canonical/multipass).[^2] My original experience was with Amazon Linux 2023, but this demo is intended to be generic.

[^2]: I'm brand new to multiplass, but I like its ability — from a macOS terminal — to install, launch and connect to a new instance with 3 simple commands.

My original bash script is a bit niche, so for the purposes of this tutorial I wrote something simpler:

```bash
#!/bin/bash

# example.sh

base=15
product=$(($base * $1))
now=$(date '+%Y-%m-%d %H:%M:%S')

echo The input number is $1.
echo The product of $base times input is ${product}.
echo This script was executed on $now.
```

The above script checks for a single integer argument[^3], multiplies it by 15 and then echos the result as well as the date and time it was executed.

[^3]: A better version of this script would ensure one and only one argument, and would check to make sure it was a number.

Run this script:

```bash
bash example.sh 5
```

The result should be something similar to the output below:

```bash
ubuntu@verified-whistler:~$ bash example.sh 5
The input number is 5.
The product of 15 times input is 75.
This script was executed on 2024-02-04 22:16:11.
```

## Create a service unit

Service units are saved in `/etc/systemd/system`. To create one, create a new file there (I did not log in as root, so I am using sudo):

```bash
sudo vim /etc/systemd/system/example.service
```

```bash
[Unit]
Description="Run a script and pass an integer as the only argument"

[Service]
Type=oneshot
ExecStart=/bin/bash /home/ubuntu/example.sh 5
User=ubuntu
```

The service can now be run using the following command:

```bash
sudo systemctl start example.service
```

Not seeing the expected output? That's because output of services is sent directly to logs by default. You can quickly check the most recent logs of a service using:

```bash
sudo systemctl status example.service
```

The service output should be shown with information about the invocation.

## Add a system timer

In order to run our service on a schedule, we need to create a system timer. A system timer is a service unit that calls a service at a specific interval OR at a specific point in time or repeating point in time.

Create a new timer:

```bash
sudo vim /etc/systemd/system/example.timer
```

Add the following to the timer file. It will invoke the example service unit every fifteen seconds.

```bash
[Unit]
Description="15 second timer for example service"

[Timer]
OnBootSec=15sec
OnUnitActiveSec=15sec
AccuracySec=1us
Persistent=true
Unit=example.service
```

Now activate the timer using:

```bash
sudo systemctl enable example.timer
```

And start it using:

```bash
sudo systemctl start example.timer
```

View the status of all timers — including next time, last time and time left until next — using:

```bash
sudo systemctl list-timers
```

![systemctl list-timers](/img/timers/list-timers.png)

You can also view the status of this specific timer:

```bash
sudo systemctl status example.timer
```

And the status of `example.service` now shows `example.timer` as the trigger. This script is now running every 15 seconds.

Stop the timer using:

```bash
sudo systemctl disable example.timer
```

**Note:** Any changes made to service unit files requires restarting the daemon using:

```bash
sudo systemctl daemon-reload
```

## Create a service unit template

For my original implementation, I needed to run multiple instances of the same script nightly, passing different arguments for each job. This could be accomplished by creating individual unit files and timers for each job. However, `systemd` also supports creating unit and timer templates, which allow the user to invoke many service units based on those shared templates.

To create a service template, create a service unit file with an @ character before the .timer bit, e.g.:

```bash
vim /etc/systemd/system/example@.service
```

The contents should be nearly identical to our one-off unit above, with one exception:

```bash
[Unit]
Description="Run a script and pass an integer as the only argument"

[Service]
Type=oneshot
ExecStart=/bin/bash /home/ubuntu/example.sh %i
User=ubuntu
```

The `%i` acts as a variable, and is replaced by a string that appears after the `@` character when we create a new service based on our template.

Be sure to run `sudo systemctl daemon-reload`. Once loaded, you can run a new unit based on the template using:

```bash
sudo systemctl start example@1
```

The 1 is passed as the argument to the script. The output can be viewed, as usual, using `sudo systemctl status example@1`.

Any number of services can be started by passing another argument to the template.

## Create a system timer template

We can now create a timer template file that, when enabled, will accept a naming parameter and pass that parameter to our service template:

Create the timer using `sudo vim /etc/systemd/system/15sec@.timer` and add the following:

```bash
[Unit]
Description="15 second timer for example service"

[Timer]
OnBootSec=15sec
OnUnitActiveSec=15sec
AccuracySec=1us
Persistent=true
Unit=example@%i.service
```

Run `sudo systemctl daemon-reload`. We can now create any number of timed services using this template:

```bash
sudo systemctl start 15sec@33.timer
sudo systemctl start 15sec@666.timer
sudo systemctl start 15sec@999.timer
```

Each command will start a new timer that runs in perpetuity, which will in turn call `example@.service` and pass the parameter on to the bash script.

Show all started timers using `systemctl list-timers`.

Obviously, running a script every 15 seconds has limited utility. Systemd timers also support [realtime timers](https://wiki.archlinux.org/title/Systemd/Timers#Realtime_timer), so scripts can be run on a schedule.
