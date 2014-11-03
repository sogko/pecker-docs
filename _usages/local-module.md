---
layout: documentation
title: "Local Module"
order: 4
---

----

#### Using Pecker as a local NodeJS module

This is useful if you want to **create your own custom build workflow**.

You can also **integrate Pecker into your existing build** *(in your ```Gruntfile.js``` or ```gulpfile.js```, for example)*.


Here's an example on how to use ```Pecker.Builder``` directly

{% highlight javascript %}
var Pecker = require('pecker');

// define Pecker.Builder options
var opts = { /*...*/ };
// or require a .js or json file containing configured options
// for eg: var opts = require('./pecker.json');

// create Pecker.Builder instance
var builder = new Pecker.Builder(opts);

// build assets defined in `opts`
builder.buildAssets(function () {
	console.log('Build completed');
);

{% endhighlight %}

Refer to API documentation to explore more in depth.
