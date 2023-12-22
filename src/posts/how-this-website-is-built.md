---
title: How this website is built
date: 2023-12-21T18:33:15.415Z
draft: false
tags:
    - Javascript
    - Deno
    - Lume
---

I'm primarily a javascript developer. I have built many websites, from simple, single HTML documents to large "enterprise" style apps. I'm quite comfortable building React [SPAs](https://developer.mozilla.org/en-US/docs/Glossary/SPA), in which the server sends a single HTML document to the client, which in turn instructs the client to download a few kilobytes or megabytes of javascript, which then constructs the UI and makes additional calls to the server for data. This usually results in a lovely, snappy interface that users have become quite accustomed to.

<!--more-->

### Drawbacks of javascript frameworks

#### Bloat

Web browsers were built to download HTML and render it. CSS, javascript and every other technology added over the years have added processing load to that simple paradigm. Most websites are downloading a mountain of programs, most of them unused, underused or misused by the client. This can make websites feel slow to load and use. For contemporary ad-supported sites, this has also created some [dark patterns](https://en.wikipedia.org/wiki/Dark_pattern), where much of the javascript isn't benefiting the visitor in any way. 

So much of the web has become bloated and hostile, requiring more computer power just to render a web page. This is especially noticable on mobile browsers.

#### Build tools

Many early websites were made by hand. Developers wrote HTML files using ordinary text editors and then saved them to a server accessible by anyone on the internet. In the modern era, developers rarely write HTML by hand, instead writing their code in some intermediary language, which is ultimately rendered to HTML, either during development or by the browser. These build tools create additional layers of abstraction, which means the developer ultimately has less control over what the client receives. 

However, build tools can save a lot of time! Writing HTML by hand is tedious and repetitive, so it's no wonder we've come up with ways to automate it. 

So what to do?

### Compromise

My main goal with this website was to reduce client bloat while making this website easy to update and maintain. I also wanted to feel like I was doing something interesting, even cutting edge. So, enter [Deno](https://deno.land) and [Lume](https://lume.land). Deno is a javascript runtime that allows you to run javascript code on the server. It aims to be a successor to [Node](https://nodejs.org/en). I won't go deeply into it, but I chose Deno because it conforms more closely to modern [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) standards and also because it is new and interesting.

Lume is a framework that generates static sites. When I create a new page in Lume, such as this page, I write it in [Markdown](https://daringfireball.net/projects/markdown/), a text format that translates easily into HTML. When I publish the site, Lume takes the Markdown file and template information and generates static HTML and accompanying assets such as images and CSS. These pages are then served to the client, and only the javascript that is absolutely necessary to the function of the page is shipped with it. 

There is a build tool layer, but I feel like I have complete control over the output using the Lume tools and templates. Additionally, I was able to set up this blog using the [Simple Blog](https://github.com/lumeland/theme-simple-blog) theme, which required only a few lines of code to get started. I get the benefit of updates to the main template while having complete control to customize as needed.

## Conclusion

Hopefully this page loads fast for you, the visitor. I will continue customizing and optimizing this site when I have time. 

## Stack details

- Built by Lume using Deno
- Hosted on [Deno Deploy](https://deno.com/deploy)
- Source hosted on Github, deploymed via Github Actions