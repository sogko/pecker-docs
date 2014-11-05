---
layout: documentation
title: "Package asset"
order: 6
subLevel: 1
---

----

##### assetNames
An array of asset names to be added to a package asset.

The assets must be define in the current Pecker configuration.

* Required: `true`
* Default: `[]`
* Possible values: An array of valid asset names.
* Examples of valid asset names:
  * A `file`, `browserify` or `url` asset name, for example:
      * `site.js`
      * `site.css`
      * `jquery.min.js`
  * A file within a `folder` asset name, for example:
      * `vendor/bootstrap.min.css`
      * `vendor/bootstrap.min.js`
  * Another `package` asset name.

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
    { "type": "file", "name": "site.css", ... },
    { "type": "folder", "name": "vendor", ... },
    { "type": "browserify", "name": "site.js", ... },
    {
      "type": "url",
      "name": "jquery.min.js",
      "url": "http://code.jquery.com/jquery-1.11.1.min.js"
    },
    {
      "type": "package",
      "name": "commonPackage",
      "assetNames": [
        "jquery.min.js",
        "vendor/bootstrap/bootstrap.min.js"
        "vendor/bootstrap/bootstrap.min.css",
      ]
    },
    {
      "type": "package",
      "name": "sitePackage",
      "assetNames": [
        "commonPackage",
        "vendor/bootstrap/bootstrap.min.js",
        "site.css",
        "site.js"
      ]
    }
  ]
}
{% endhighlight %}

The above example will result in two (2) packages:

* `commonPackage` has three (3) assets with the following URLs:

  ```
  http://code.jquery.com/jquery-1.11.1.min.js
  /assets/vendor/bootstrap/bootstrap.min.js
  /assets/vendor/bootstrap/bootstrap.min.css
  ```

* `sitePackage` has five (5) assets with the following URLs:

  ```
  http://code.jquery.com/jquery-1.11.1.min.js
  /assets/vendor/bootstrap/bootstrap.min.js
  /assets/vendor/bootstrap/bootstrap.min.css
  /assets/site.css
  /assets/site.js
  ```

Notes

* `sitePackage` contains another `package` asset (commonPackage).
* `sitePackage` contains `vendor/bootstrap/bootstrap.min.js` <br/>(a file in a `folder` asset which is already an asset in `commonPackage`)
* The order of the assets in a package is preserved, making managing asset dependencies maintainable.