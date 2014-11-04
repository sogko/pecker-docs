---
layout: documentation
title: "Configuring options"
order: 3
---

----

You can configure the options for your Pecker-managed project in two (2) ways:

* as a JSON object in `pecker.json` for Pecker CLI, or
* as a JavaScript object passed into Pecker.Builder constructor.

#### Using Pecker options in `pecker.json`

Here's how you would pass in your Pecker options if you are using the **Pecker CLI**.

1. Open your terminal.
2. Run `pecker init` in your project folder
{% highlight bash %}
$ cd /path/to/your/project.
$ pecker init
{% endhighlight %}

Alternatively, you can manually create a `pecker.json` file in your project folder

{% highlight json %}
{
  "name": "my-project",
  "baseUrl": "/path/to/your/project",
  "destDir": "./dist",
  "assets": [
    { "type": "file",  ... },
    ...
  ]
}
{% endhighlight %}


#### Using Pecker options as a JavaScript object for Pecker.Builder

Here's how you would pass in your Pecker options if you are using the **Pecker.Builder** directly in a NodeJS script.

{% highlight javascript %}
var Pecker = require('pecker');
var opts = {
    name: "pecker-docs",
    baseUrl: "/pecker/dist",
    destDir: "./dist",
    assets: [
        { type: "file",  ... },
        ...
    ]
};

// create an instance of Pecker Builder with options
var builder = new Pecker.Builder(opts);

// build assets
builder.buildAssets(function () {
    console.log('Done!');
});

{% endhighlight %}


See Configurations to see available options