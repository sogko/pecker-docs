---
layout: documentation
title: "Client-side"
order: 6
draft: true
---

#### Using Pecker as a client-side script in browser
Using Pecker in your Gulp build workflow is as simple as using the Pecker module directly in your ```gulpfile.js``` and defining a gulp task.

{% highlight javascript %}
// gulpfile.js

var gulp = require('gulp');
var Pecker = require('pecker');

// define gulp task using Pecker.Builder
gulp.task('build', function (done) {

	// define Pecker.Builder options
	var opts = { /*...*/ };
	// or require a .js or json file containing configured options
	// for eg: var opts = require('./pecker.json');

	// create Pecker.Builder instance
	var builder = new Pecker.Builder(opts);

	// build assets defined in `opts`
	builder.buildAssets(function () {
		console.log('Build completed');
		done();
	}); 
});
{% endhighlight %}

Refer to API documentation to explore more in depth.