---
layout: documentation
title: "Client-side"
order: 6
---

----

#### Using Pecker as a client-side script in browser

Follow the following steps to get started using Pecker as a client-side script in the browser.

Note: Due to limitations of the browser, certain APIs are not available, such as Pecker.Builder APIs.
Refer to the Reference to find out more.

##### 1. Build your assets

To build your assets, do either one of the following:

* If you are using Pecker CLI, run `pecker build`.
* If you are using Pecker module in your script, call `Pecker.Builder.buildAssets()` method.


##### 2. Load generated client-side Pecker script files

As part of the build, the Pecker.Builder will automatically generate two JavaScript files in
your output folder specified in [destDir]({{site.url}}{{site.baseurl}}/configurations/general/#destdir):

* `pecker.js`: main script file that exposes Pecker API in your browser.
* `pecker-loader.js`: a script that initialized the global Pecker object.

These files will be added to your `manifest.json` file as well.

{% highlight html %}
<!-- assuming that both JS files are in `dist/` path -->
<script src="dist/pecker.js"></script>
<script src="dist/pecker-loader.js"></script>
{% endhighlight %}

Note: the order that the scripts are loaded matters.

##### 3. Use Pecker API directly in your client-side scripts

After loading the client-side Pecker script files, you can refer to the global `Pecker` object instance and
access Pecker API directly.

For example:
{% highlight html %}
<script>
    // display Pecker version
    console.log('Pecker version: ' + Pecker.version);
    // -> "Pecker version: 1.0.0"

    // display `pecker.js` url path
    console.log('pecker.js: ' + Pecker.Assets.getUrl('pecker.js'));
    // -> "pecker.js: dist/pecker.js"
</script>
{% endhighlight %}

Refer to API documentation to explore more in depth.

##### Tips: Automatically include Pecker scripts using server-side templates.

You can automatically include Pecker scripts using server-side templates.

The following example uses:

* `Handlebars` for the template engine.
* `jsonfile` to read our `manifest.json` file.

{% highlight javascript %}
var Pecker = require('pecker');
var Handlebars = require('handlebars');
var jf = require('jsonfile');

// register package asset tag helper, `PeckerAsset`
Handlebars.registerHelper('PeckerAsset', function (options) {
  // read `manifest.json` generated after running `pecker build`
  var manifest = jf.readFileSync('./dist/manifest.json');

  // create Pecker.Assets instance with generated `manifest.json`
  var peckerAssets = new Pecker.Assets(manifest);
  return new Handlebars.SafeString(
    // given the asset name and other options, construct the asset HTML string
    peckerAssets.constructAssetHTML(options.hash.name, options.hash)
  );
});

{% endhighlight %}

This is an example of a template file.
{% highlight html %}
<html>
<head>
<!-- load scripts from Pecker asset package -->
{% raw %}{{ PeckerAsset name="Pecker" type="script" }}{% endraw %}
</head>

<body>
  <!-- insert body content here -->
</body>
</html>
{% endhighlight %}

This is an example output after running the above template through Handlebars
{% highlight html %}
<html>
<head>
<!-- load scripts from Pecker asset package -->
<script src="/dist/pecker.js"></script>
<script src="/dist/pecker-loader.js"></script>
</head>

<body>
  <!-- insert body content here -->
</body>
</html>
{% endhighlight %}