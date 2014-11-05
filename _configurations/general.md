---
layout: documentation
title: "General configuration"
order: 1
---

----

##### name
Name to identify your project.

* Default: `null`
* Possible values: Any valid `string`


##### env
Project environment.

* Required: `false`
* Default: `'development'`
* Possible values: `'development'` | `'production'`


##### baseDir
Base path of current working directory. Other path definitions will be relative to the base path.

* Required: `false`
* Default: `'.'` (relative to current working directory)
* Possible values: Any valid `string`.


##### destDir
Path of the destination directory where the assets will be written to.

The path can be an absolute path or relative to the [`baseDir`](#basedir).

* Required: `false`
* Default: `'dist'`
* Possible values: Any valid `string`.

##### baseUrl
The base url path of which the assets will be served from.

For example, if `baseUrl` is `/static`, an asset with a name of `site.css` will have its url path as `/static/site.css`.

* Required: `false`
* Default: `'/static'`
* Possible values: Any valid URL.

##### assets
An array of asset configurations.

* Required: `false`
* Default: `[]`
* Possible values: An array of asset config options.

See [Asset Configurations]({{site.url}}{{site.baseurl}}/configurations/basic-asset) to see available options

##### skip
A list of names of assets that the builder should skip.

* Required: `false`
* Default: `[]`
* Possible values: An `array` of `string` of asset names defined in [`assets`](#assets).

##### skipHash
A flag that the builder uses to decide whether or not it should create hash for all assets.

This value overrides `skipHash` value for each asset config options.

* Required: `false`
* Default: `null`
* Possible values: `null` | `false` | `true`

If value is `null`, the builder will use the value of each asset config options.

If value is `true`, the builder will create hash for all assets, regardless of each asset options.

If value is `false`, the builder will not create any hash for any assets, regardless of each asset options.


##### silent
Suppress all logs if build was run from terminal through Pecker CLI.

* Required: `false`
* Default: `false`
* Possible values: `boolean`

#### Example
{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "/assets",
  "destDir": "./dist",
  ...
  "assets": [
    { "type": "file", "name": "site.css", ... },
    { "type": "folder", "name": "vendor", ... },
    { "type": "browserify", "name": "site.js", ... },
    ...
  ]
}
{% endhighlight %}