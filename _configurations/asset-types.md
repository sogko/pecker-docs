---
layout: documentation
title: "Asset types"
order: 2
---

----

In the most general sense, Pecker recognizes any type of content as an asset.
<br/>As long as you can serve the file from your server, it is an asset for you and your web application.

Pecker has defined five (5) asset types to help you manage your assets easily:

* `file`
* `folder`
* `browserify`
* `url`
* `package`

----

### File asset
A `file` asset is the most basic asset type that you can have. Any physical file can be a `file` asset.

Typical examples of a `file` asset:

* a script file,
* a stylesheet file,
* an image file,
* an audio file,
* an icon file,
* and the list goes on!

Basically, any single file that you want to serve from your server, is basically a `file` asset.


See [`file` asset configuration options]({{site.url}}{{site.baseurl}}/configurations/file-asset).

#### Basic file asset example

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
|   |   |-- even-more-styles.css
|   |   |-- ...
|   |-- scripts/
|   |   |-- ...
|   |-- ...
|-- dist/

{% endhighlight %}

Let's include our stylesheet assets in our `index.html`.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <!-- multiple stylesheet assets -->
  <link rel="stylesheet" href="dist/site.css"/>
  <link rel="stylesheet" href="dist/components.css"/>
  <link rel="stylesheet" href="dist/more-styles.css"/>
  <link rel="stylesheet" href="dist/even-more-styles.css"/>
  ...
</head>
...
</html>
{% endhighlight %}


An example `pecker.json` with the following basic `file` asset configurations:
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
      "name": "even-more-styles.css",
      "files": "./src/stylesheets/even-more-styles.css"
    }
  ]
}
{% endhighlight %}

Running `pecker build` from `/path/to/your/project/` folder in your terminal will generate the following files in your `dist` folder.

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
|   |-- even-more-styles.css
|   |-- manifest.json
|   |-- pecker.js
|   |-- pecker-loader.js
{% endhighlight %}



#### Concatenating multiple files into a single `file` asset

A typical web application may have multiple `file` assets which are served on every page request.

Here's an example HTML of a typical page with multiple CSS file assets.
{% highlight html %}
<!doctype html>
<html lang="en">

<head>
  ...
  <!-- multiple stylesheets -->
  <link rel="stylesheet" href="/assets/site.css"/>
  <link rel="stylesheet" href="/assets/components.css"/>
  <link rel="stylesheet" href="/assets/more-styles.css"/>
  <link rel="stylesheet" href="/assets/even-more-styles.css"/>
  ...
</head>

<body>
  ...
</body>
</html>
{% endhighlight %}

While there is nothing wrong


