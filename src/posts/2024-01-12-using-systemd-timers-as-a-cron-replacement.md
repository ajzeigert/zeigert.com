---
title: Using systemd timers as a cron replacement
date: '2024-02-04'
draft: true
tags:
  - Linux
  - Cron
  - Devops
---

I recently decided to upgrade an old utility instance on AWS from Amazon Linux 2 to Amazon Linux 2023. This was mostly easy, as the linux flavors are very similar, however…

Cron is not installed by default on Amazon Linux 2023, and AWS recommends using `systemd` to run scheduled tasks instead of using `cron`. So I decided to learn how to do that.

<!-- more -->

The basic need: Make daily backups of several Postgres databases hosted on RDS and push those backup files to S3, then perform some rolling backup management on S3. (Yes, I also use the built-in snapshot functionality of RDS, but I want easy dump files that can be restored quickly to a dev environment for troubleshooting.)

The existing server used cron to do this. Here’s an example crontab:

```sh
CRON_TZ=PST
@midnight $HOME/postgresql_auto_backup_s3/pg_backup_rotated.sh -c $HOME/postgresql_auto_backup_s3/app_backup.config >> $HOME/psql2s3_logs/backup.log 2>&1
```

And it has worked well for years! So why change? Well, using `cron` on AL2023 is possible, but it requires some unofficial packages that could break or be difficult to maintain. Since there was going to be learning involved either way, why not use the recommended way?

Although my setup was specific to my postgres backup jobs, I'm going to demonstrate a generic implementation below.

## System services overview

This post assumes the reader is already somewhat familiar with `systemd` and `systemctl`. I'm an amateur myself, so I'll explain as simple as I can. `systemd` does a [bunch of things](https://en.wikipedia.org/wiki/Systemd), but I think of it as being responsible for setting up the system when it starts up by mounting disks, starting services, etc.

`systemctl` is a command for creating and managing **services**, which can be just about anything. In our case, it's a single bash script.

Another use case for a service is to run Node on a production server. The main advantages (for me) of running Node as a service is that `systemd` will restart the service if it crashes and maintain logs. Our services will be "oneshot" services, i.e. they will be called and run when needed, not left running all the time.

Services are defined using _unit files_, which are generally stored in `/etc/systemd/system`.

## Setup

For this tutorial, I'll be using a clean Ubuntu 22.04.3 running via [multipass](https://github.com/canonical/multipass).[^1] My original experience was with Amazon Linux 2023, but for the sake of most users, I'm going with something a little more mainstream.

[^1]: I'm brand new to multiplass, but I like its ability — from a macOS terminal — to install, launch and connect to a new instance with 3 simple commands.

My original script is a bit niche, so for the purposes of this tutorial I wrote something a bit simpler:

```bash
#!/bin/bash

# example.sh

base=15
product=$(($base * $1))
now=$(date '+%Y-%m-%d %H:%M:%S')

echo The random input number is $1.
echo The product of $base times input is ${product}.
echo This script was executed on $now.
```

The above script checks for a single integer argument[^2], multiplies it by 15 and then echos the result as well as the date and time it was executed.

[^2]: A better version of this script would ensure one and only one argument, and would check to make sure it was a number.

Run this script: `sh example.sh 5`. The result should be something similar to the output below:

```bash
ubuntu@verified-whistler:~$ sh example.sh 5
The random input number is 5.
The product of 15 times input is 75.
This script was executed on 2024-02-04 22:16:11.
```

To randomize the output slightly, we can pass a bash command that will generate a random number between 1 and 10 as the argument:

```bash
sh example.sh $((1 + $RANDOM % 10))
```

## Create a service unit

Service units are saved in `/etc/systemd/system`. To create one, create a new file there (I did not log in as root, so I am using sudo):

```bash
sudo vim /etc/systemd/system/example.service
```

```bash
[Unit]
Description="Generate a random number and pass it to a script"

[Service]
Type=oneshot
ExecStart=/bin/bash /home/ubuntu/example.sh $((1 + $RANDOM % 10))
User=ubuntu
```

The service can now be run using the following command:

```bash
sudo systemctl start example.service
```

Not seeing the expected output? That's because output of services is sent directly to logs be default. You can quickly check the most recent logs of a service using:

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

Add the following to the timer file; It will invoke the example service unit every fifteen seconds.

```bash
[Unit]
Description="Daily timer for example service"

[Timer]
OnBootSec=15sec
OnUnitActiveSec=15sec
AccuracySec=1us
Persistent=true
Unit=example.service

[Install]
WantedBy=default.target
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

You can also view the status of this specific timer, although the logs

```bash
sudo systemctl status example.timer
```

**Note:** Any changes made to service unit files requires restarting the daemon using:

```bash
sudo systemctl daemon-reload
```

## Create a service unit template

For my original implementation, I needed to run the same script with slightly different arguments. Instead of writing all of my timers individually, I utilized service templates and timer templates so I could reuse my code. Below is a simple implementation.

First, we'll reuse our

`sudo vim /etc/systemd/system/backup_postgres@.service`

https://www.baeldung.com/linux/systemd-multiple-parameters

```bash
[Unit]
Description="Dump database, copy to S3, and manage rolling backups"

[Service]
Type=oneshot
ExecStart=/home/ec2-user/postgresql_auto_backup_s3/pg_backup_rotated.sh -c /home/ec2-user/postgresql_auto_backup_s3/%i.config
User=ec2-user
StandardOutput=append:/var/log/gsk_backups/%i.log
StandardError=append:/var/log/gsk_backups/%i.log

[Install]
WantedBy=daily@.timer
```

`sudo systemctl daemon-reload`

`sudo systemctl enable backup_postgres@`

Test immediately
`sudo systemctl start backup_postgres@spills_backup`

## Create a system timer template

https://wiki.archlinux.org/title/Systemd/Timers

`sudo vim /etc/systemd/system/daily@.timer`

```bash
[Unit]
Description="Daily timer for %i service"

[Timer]
OnCalendar=*-*-* 23:00:00 America/Los_Angeles
AccuracySec=6h
RandomizedDelaySec=1h
Persistent=true
Unit=backup_postgres@%i.service

[Install]
WantedBy=default.target
```
`sudo systemctl daemon-reload`

`sudo systemctl enable daily@.timer`

## Putting it all together

Create a timer that calls the backup_postgres@.service using our daily template

`sudo systemctl enable daily@spills_backup.timer`
`sudo systemctl start daily@spills_backup.timer`

View your timers, including their last and next invocations:

`systemctl list-timers`

## Bonus: CloudWatch Agent connection

`sudo yum install amazon-cloudwatch-agent`

Make sure IAM role is attached to instance

https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-iam-roles-for-cloudwatch-agent-commandline.html

`vim /opt/aws/amazon-cloudwatch-agent/bin/config.json`

https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Configuration-File-Details.html#CloudWatch-Agent-Configuration-File-Logssection

You can specify `log_group_name` and `log_stream_name` but since we're using a wildcard to push several log files, leaving `log_group_name` blank will tell the agent to use the `file_path` as the group name.

```json
"logs": {
    "log_stream_name": "logs",
    "logs_collected": {
        "files": {
            "collect_list": [
                {
                    "log_group_name": "gsk_backups",
                    "file_path": "/var/log/gsk_backups/**.log",
                    "retention_in_days": 7,
                    "auto_removal": true
                }
            ]
        }
    }
},
```

`sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json`

Check logs

## Caveats

- If you don't use `auto_removal`, logs will get bigger on disk.

- Errors are just getting pushed into the logs, it might be wise to create some alerts or use other CloudWatch tools to help identify important logs.
