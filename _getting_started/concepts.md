---
layout: documentation

title: "Concepts"
order: 2
date: 2014-10-08 23:24:43
---

----

#### What is an asset?
An asset is simply any type of content that you want to make available on a HTML page in your web application.

This includes &mdash; but not limited to:

* images
* audio files
* scripts
* stylesheets
* icons
* external URL resources
* and many more!



----

#### What kind of assets are supported?

<div style="text-align:center;">
<strong>EVERY ONE OF THEM.</strong>
<br/>
<img src="http://i.imgur.com/bzeiiDD.gif"/ style="width: 100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;">
</div>

In all seriousness, every kind of assets can be supported and managed using Pecker framework.

In Pecker, any kind of asset can fall into at least one of the following Pecker-defined **asset types**:

* a physical file (i.e. a **file asset**), for eg: JavaScript scripts, CSS/LESS/SASS stylesheets
* an entire folder and its content (including sub-folders) (i.e. a **folder asset**)
* a URL referring to an external file asset (i.e. a **URL asset** hosted in a CDN)
* a [`browserify`](http://browserify.org) bundle (i.e.  a **browserify** asset, a special asset type)
* an ordered set of assets (i.e. an asset **package**); can also include another asset package (**nested package**)

##### Related pages
* Read more about [Pecker's asset types]().

