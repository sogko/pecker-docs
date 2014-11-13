---
layout: documentation
title: "Folder asset type"
order: 3
---

----

A `folder` asset is another useful asset type.

Any physical folder can be a `folder` asset.

Specifying a folder as a `folder` asset allows you to easily reference its files and sub-folders as a `file` asset.

For `folder` asset configuration options, see [Configurations > Folder asset]({{site.url}}{{site.baseurl}}/configurations/folder-asset).


----

### Usages

We will go through some examples of typical use-cases for using `folder` assets:

* Simple `folder` assets.
* Including contents in a `folder` asset in a `package` asset.

----

#### Simple `folder` assets.

The `folder` asset is most useful:

* when you need to manage multiple file assets
* when the file assets are of varied types (*.css, *.js, *.jpg, etc)
* when you don't need any transformation done the files
* when you only need to serve the assets as-it-is.

You would be able to see how easy this makes organizing your `file` assets as-it-is.

Let's say you have the following project structure for a simple HTML project. And in this project you make use of a vendor code (for example, [Bootstrap 3](http://getbootstrap.com))

{% highlight bash %}
/path/to/your/project/
|-- pecker.json
|-- index.html
|-- src/
|   |-- bootstrap
|   |   |-- css
|   |   |   |-- bootstrap-theme.css
|   |   |   |-- bootstrap-theme.css.map
|   |   |   |-- bootstrap-theme.min.css
|   |   |   |-- bootstrap.css
|   |   |   |-- bootstrap.css.map
|   |   |   |-- bootstrap.min.css
|   |   |-- fonts
|   |   |   |-- glyphicons-halflings-regular.eot
|   |   |   |-- glyphicons-halflings-regular.svg
|   |   |   |-- glyphicons-halflings-regular.ttf
|   |   |   |-- glyphicons-halflings-regular.woff
|   |   |-- js
|   |   |   |-- bootstrap.js
|   |   |   |-- bootstrap.min.js
|   |-- stylesheets/
|   |   |-- ...
|   |-- scripts/
|   |   |-- ...
|   |-- ...
|-- dist/

{% endhighlight %}

Imagine if you need all of the files within `./src/bootstrap/**`, you would think that you would need to define a `file` asset configuration for **each** file.

That would work but you would end up with a pretty huge `pecker.json` configuration. And totally unnecessary.

Instead, with `folder` asset, you can have the following:

{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "./",
  "destDir": "./dist",
  "assets": [
    {
      "type": "folder",
      "name": "bootstrap",
      "folder": "./src/bootstrap"
    }
  ]
}
{% endhighlight %}

This would tell `Pecker.Builder` to copy the whole `./src/bootstrap/` folder and its content into `./dist`.

You can even choose to include/exclude files to copy with the [include]({{site.url}}{{site.baseurl}}/configurations/folder-asset/#include) and [exclude]({{site.url}}{{site.baseurl}}/configurations/folder-asset/#exclude) options.

For example, if you want to exclude the CSS sourcemap files (*.map), you can have the following `pecker.json`.

{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "./",
  "destDir": "./dist",
  "assets": [
    {
      "type": "folder",
      "name": "bootstrap",
      "folder": "./src/bootstrap",
      "exclude": ["**/*.map"]
    }
  ]
}
{% endhighlight %}

-----

#### Including contents in a `folder` asset in a `package` asset

Another cool feature of `folder` asset is that it allows you to reference its files and sub-folders in a `package` asset.

This allows you to create `package` assets for different environment / needs; for example one package for development environment, and one package for production with the minified vendor sources only.

Continuing from the previous example and folder structure:

{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "./",
  "destDir": "./dist",
  "assets": [
    {
      "type": "folder",
      "name": "bootstrap-dist",
      "folder": "./src/bootstrap"
    },
    {
      "type": "package",
      "name": "bootstrap-dev",
      "assetNames": [
        "bootstrap-dist/js/bootstrap.js",
        "bootstrap-dist/css/bootstrap.css",
        "bootstrap-dist/css/bootstrap.css.map"
      ]
    },
     {
       "type": "package",
       "name": "bootstrap-production",
       "assetsNames": [
         "bootstrap-dist/js/bootstrap.min.js",
         "bootstrap-dist/css/bootstrap.min.css"
       ]
     }
  ]
}
{% endhighlight %}


When you run `pecker build`, it still will copy `bootstrap` vendor files into `dist`.

Now you can use `Pecker.Assets` to load the right assets using `packages`.