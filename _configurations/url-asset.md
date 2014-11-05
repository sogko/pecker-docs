---
layout: documentation
title: "URL asset"
order: 7
subLevel: 1
---

----

##### url
The URL that points to the location of the asset.

The assets must be define in the current Pecker configuration.

* Required: `true`
* Default: `null`
* Possible values: A valid URL.

----


#### Example `package` asset configuration
Transform all `*.scss` SASS files from a folder and produce a single `site.css` file asset
{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "/assets",
  "destDir": "./dist",
  "assets": [
    {
      "type": "url",
      "name": "jquery.min.js",
      "url": "http://code.jquery.com/jquery-1.11.1.min.js"
    }
  ]
}
{% endhighlight %}

The above example will define a `url` asset `jquery.min.js` that points to `http://code.jquery.com/jquery-1.11.1.min.js`.