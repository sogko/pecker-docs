---
layout: documentation
title: "File asset type"
order: 2
---

----

A `file` asset is the most basic asset type that you can have. Any physical file can be a `file` asset.

Typical examples of a `file` asset:

* a script file,
* a stylesheet file,
* an image file,
* an audio file,
* an icon file,
* and the list goes on!

Basically, any single file that you want to serve from your server, is a `file` asset.


For `file` asset configuration options, see [Configurations]({{site.url}}{{site.baseurl}}/configurations/file-asset).


----

### Usages

We will go through some examples of typical use-cases for using `file` assets:

* Simple `file` assets.
* Concatenating multiple files into a single `file` asset.
* Applying transformations on `file` assets.


----

#### Simple file assets

To demonstrate a simple (and trivial) use-case for file assets, we are going to work on a simple
HTML project where we have multiple stylesheets and scripts.

Each stylesheet and script will be a separate `file` asset.

Let's say you have the following project structure for a simple HTML project.

{% highlight bash %}
/path/to/your/project/
|-- pecker.json
|-- index.html
|-- src/
|   |-- stylesheets/
|   |   |-- site.css
|   |   |-- components.css
|   |   |-- more-styles.css
|   |   |-- ...
|   |-- scripts/
|   |   |-- site.js
|   |   |-- components.js
|   |   |-- ...
|   |-- ...
|-- dist/

{% endhighlight %}

Next, create a `pecker.json` configuration, defining a `file` asset configuration for each stylesheet or script file.

<div id="simple-file-assets-pecker-json"></div>

{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "./",
  "destDir": "./dist",
  "assets": [
    {
      "type": "file",
      "name": "site.css",
      "files": "./src/stylesheets/site.css"
    },
    {
      "type": "file",
      "name": "components.css",
      "files": "./src/stylesheets/components.css"
    },
    {
      "type": "file",
      "name": "more-styles.css",
      "files": "./src/stylesheets/more-styles.css"
    },
    {
      "type": "file",
      "name": "site.js",
      "files": "./src/scripts/site.js"
    },
    {
      "type": "file",
      "name": "components.js",
      "files": "./src/scripts/components.js"
    },
  ]
}
{% endhighlight %}

Run `pecker build` from `/path/to/your/project/` folder in your terminal.

{% highlight bash %}
$ cd /path/to/your/project/
$ pecker build
{% endhighlight %}


This will generate the following files in your `dist` folder.

{% highlight bash %}
/path/to/your/project/
|-- pecker.json
|-- index.html
|-- src/
|   |-- stylesheets/
|   |-- scripts/
|   |-- ...
|-- dist/
|   |-- site.css
|   |-- components.css
|   |-- more-styles.css
|   |-- manifest.json
|   |-- pecker.js
|   |-- pecker-loader.js
|   |-- site.js
|   |-- components.js
{% endhighlight %}

Basically, what we have told Pecker to do is simply create a copy of our assets defined in `pecker.json` into the folder defined in `destDir` property.

Now we have all of our assets in our "compiled" folder. (though we did not do any compiling in this example).

Let's include our stylesheet and script assets in our `index.html`.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <!-- multiple stylesheet assets -->
  <link rel="stylesheet" href="dist/site.css"/>
  <link rel="stylesheet" href="dist/components.css"/>
  <link rel="stylesheet" href="dist/more-styles.css"/>
  ...
</head>
...
<body>
...
<script src="dist/site.js"></script>
<script src="dist/components.js"></script>
</body>
</html>
{% endhighlight %}

**Notes:**

* This is a very trivial example where we simply copy selected assets into a destination folder. We have yet to begin taking advantage of the real power of Pecker.
* For real-life web development, you would consider:
  * Concatenating / minifying multiple stylesheets or scripts into a single file asset.
  * Automatically include your `file` assets into HTML pages using templates.

----

#### Concatenating multiple files into a single `file` asset

Continuing from the [previous example](#simple-file-assets), we can further improve how we manage our stylesheet and script assets.

Instead of having separate `file` assets for each stylesheet or script, we can concatenate
the stylesheets into a single `file` and the scripts into another single `file`.

This strategy brings us a couple of benefits:

* By concatenating or combining our files into a single file, we reduce the number of HTTP requests needed to server our HTML pages.
* We can "bake-in" the dependencies of the files by specifying the order of which the files are concatenated.
* In later examples, you would see how we can bring this strategy to another level by doing some transformations.

Again, let's say you have the following project structure:

{% highlight bash %}
/path/to/your/project/
|-- pecker.json
|-- index.html
|-- src/
|   |-- stylesheets/
|   |   |-- site.css
|   |   |-- components.css
|   |   |-- more-styles.css
|   |   |-- ...
|   |-- scripts/
|   |   |-- site.js
|   |   |-- components.js
|   |   |-- ...
|   |-- ...
|-- dist/

{% endhighlight %}

Now, let's change how we defined our `pecker.json` configuration by having only two (2) assets instead of the five (5) [previously](#simple-file-assets-pecker-json).

<div id="concatenation-pecker-json"></div>

{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "./",
  "destDir": "./dist",
  "assets": [
    {
      "type": "file",
      "name": "stylesheets.css",
      "files": [
          "./src/stylesheets/site.css",
          "./src/stylesheets/components.css",
          "./src/stylesheets/more-styles.css",
      ]
    },
    {
      "type": "file",
      "name": "scripts.js",
      "files": [
          "./src/scripts/site.js",
          "./src/scripts/components.js"
      ]
    }
  ]
}
{% endhighlight %}

Even though we did not have to explicitly tell Pecker to perform concatenation, Pecker knows that if a `file` asset has multiple `files`, it would automatically concatenate it into a single file.

Now we are ready to run `pecker build` from `/path/to/your/project/` folder in your terminal.

{% highlight bash %}
$ cd /path/to/your/project/
$ pecker build
{% endhighlight %}

This will generate the following files in your `dist` folder.

{% highlight bash %}
/path/to/your/project/
|-- pecker.json
|-- index.html
|-- src/
|   |-- stylesheets/
|   |-- scripts/
|   |-- ...
|-- dist/
|   |-- stylesheets.css
|   |-- scripts.js
|   |-- manifest.json
|   |-- pecker.js
|   |-- pecker-loader.js
{% endhighlight %}

Note that the output `file` assets has the same names as defined in the `pecker.json`, i.e.:

* `dist/stylesheets.css` will contain all styles from the three (3) stylesheets.
* `dist/scripts.js` will contain all scripts from the two (3) scripts.

Let's include our concatenated assets in our `index.html`.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <!-- multiple stylesheet assets -->
  <link rel="stylesheet" href="dist/stylesheets.css"/>
  ...
</head>
...
<body>
...
<script src="dist/scripts.js"></script>
</body>
</html>
{% endhighlight %}

In this example, we have just seen how a `file` asset can have multiple `files` as its source and it will be automatically concatenated into a single file. This one of the most common use-cases for managing your assets.

----

#### Applying transformations on file assets
In the previous example, we have seen how a `file` asset can have multiple `files` as its source and it will be automatically concatenated into a single file.

Building upon that, we can take the previous example even further by applying some transformations to the `file` asset.

Some examples for transformations are:

* Pre-processing LESS or SASS stylesheets into CSS.
* Automatically adding vendor-specific prefixes to your CSS styles.
* Minify-ing your CSS stylesheets.
* Compiling your Coffeescript files into JavaScript.
* Minifying and obsfucating your JavaScript files.
* And many more!

In this example, we are going to take the previous example and minify our stylesheets and scripts.

Let's update our [previous `pecker.json`](#concatenation-pecker-json) configuration by adding minification transformations to each of our defined assets.

We will use built-in transformations for this example:

* `clean-css` to minify CSS stylesheets.
* `uglify` to minify and obsfucate JavaScript.

{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "./",
  "destDir": "./dist",
  "assets": [
    {
      "type": "file",
      "name": "stylesheets.css",
      "files": [
          "./src/stylesheets/site.css",
          "./src/stylesheets/components.css",
          "./src/stylesheets/more-styles.css",
      ],
      "transform": [ "clean-css" ]
    },
    {
      "type": "file",
      "name": "scripts.js",
      "files": [
          "./src/scripts/site.js",
          "./src/scripts/components.js"
      ],
      "transform": [ "uglify" ]
    }
  ]
}
{% endhighlight %}

Two (2) lines are all that we need. Now, let's build our assets again.

{% highlight bash %}
$ cd /path/to/your/project/
$ pecker build
{% endhighlight %}

Exactly the same as the previous example, the builder will create two (2) assets. The only difference is that the files are now minified.

