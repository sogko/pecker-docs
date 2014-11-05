---
layout: documentation
title: "Browserify asset"
order: 5
subLevel: 1
---

----

##### entries
An array of file paths or glob patterns of main entry `files` to be added to the `browserify` bundle.

Refer to `browserify` API documentation on [main entry files](https://github.com/substack/node-browserify#var-b--browserifyfiles-or-opts).


Both the paths and patterns can be absolute paths or relative to the defined [baseDir]({{site.url}}{{site.baseurl}}/configurations/general/#basedir) value.

* Required: `true`
* Possible values: An array of file paths or glob patterns `strings`.
* Examples: `"./src/script.js"`, `"./src/**/*.js"`.

##### require
An array of `require` configuration [to make a `module` available from the `browserify` bundle](https://github.com/substack/node-browserify#brequirefile-opts).

A `require` configuration object should have the following properties:

* `type`
* `name`
* `expose`
* `location` *(optional)*

----

**type**: Type of required module.
<br/>
The type of the required module helps to tell Pecker.Builder where to look for the location of the module.

* Default: `"module"`.
* Possible values:
  * `"module"`: A vanilla CommonJS/NodeJS exported module.
  * `"npm"`: An [NPM](https://www.npmjs.org)-managed module.
  * `"bower"`: A [Bower](http://bower.io)-managed module.

If the type of the module is `npm` or `bower`, Pecker.Builder will automatically resolve the location of the module using [`resolve`](https://github.com/substack/node-resolve) or [`bower-resolve`](https://github.com/eugeneware/bower-resolve), respectively.

Learn more about [`location` property](#location)

----

**name**: Name of required module.
<br/>
Example: `"lodash"`, `"jquery"`.

The name will be used to resolve the location of the module.

----

**expose**: Exposed name of the required module.
<br/>
This will be the name that will be used to resolve a `require()`.

If `expose` property is not set, it will be the same as `name` property.

* Default: the value of `name` property.
* Possible values: Any valid `string`.

----
<div id="location"></div>
**location**: Path of the required module *(optional)*

If the `type` is set to `module` and `location` property is not set, Pecker.Builder will assume that the module `name` is the path of the module, relative to [baseDir]({{site.url}}{{site.baseurl}}/configurations/general/#basedir) value.

If the `type` is `npm` or `bower`, Pecker.Builder will automatically try to resolve the location of the module using [`resolve`](https://github.com/substack/node-resolve) or [`bower-resolve`](https://github.com/eugeneware/bower-resolve), respectively.

You can set the `location` property to override the resolved path.

The path can be an absolute path or relative to the defined [baseDir]({{site.url}}{{site.baseurl}}/configurations/general/#basedir) value.

----

##### external
An array of module names to be excluded from the `browserify` bundle.

Refer to `browserify` API documentation on [`b.external()`](https://github.com/substack/node-browserify#bexternalfile).

* Required: `false`
* Default: `[]`
* Possible values: An array of `string`.


##### transform
An array of transform values that is accepted by `browserify`.

Refer to `browserify` API documentation on [`b.transform()`](https://github.com/substack/node-browserify#btransformtr-opts).

* Required: `false`
* Default: `[]`
* Possible values: Valid `browserify` transform values.

##### watch
An array of file paths or glob patterns for Pecker to watch for changes.

Both the paths and patterns can be absolute paths or relative to the defined [baseDir]({{site.url}}{{site.baseurl}}/configurations/general/#basedir) value.

* Required: `true`
* Possible values: An array of file paths or glob patterns `strings`.
* Examples: `"./src/script.js"`, `"./src/**/*.js"`.


##### skipHash
A boolean flag to tell Pecker.Builder whether to generate unique content hash for this asset.

* Required: `false`
* Default: `false`
* Possible values: `true` | `false`
* Note: This value can be overridden by the non-null global [`skipHash`]({{site.url}}{{site.baseurl}}/configurations/general/#skiphash) value.

----


#### Example `browserify` asset configuration
Transform all `*.scss` SASS files from a folder and produce a single `site.css` file asset
{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "/assets",
  "destDir": "./dist",
  "assets": [
    {
      "type": "browserify",
      "name": "site.js",
      "entries": ["./src/site.js"],
      "require": [
        {
          "type": "bower",
          "name": "lodash"
        },
        {
          "type": "npm",
          "name": "path"
        },
        {
          "type": "module",
          "name": "myModule",
        },
        {
          "type": "module",
          "name": "myOtherModule",
          "location": "./components/myOtherModule.js"
        }
      ],
      "external": ["jquery"],
      "watch": ["./src/**/*.js"]
    }
  ]
}
{% endhighlight %}

* **name**: `site.css` is the asset name and also will be the filename of the generated output file.
* **entries**: `./src/site.js` will be the entry file for the `browserify` bundle.
* **require**: Include the following modules in the output bundle:
  * `lodash`: A Bower-managed module, would be in `bower_components` by default.
  * `path`: A built-in NodeJS module. (Yes, we can do that).
  * `myModule`: A custom module writting in CommonJS/NodeJS format (exported module). Since the location of the module is not specified, it's expected to be found in either:

      * `/path/to/your/project/myModule.js`, or
      * `/path/to/your/project/myModule/index.js`.
  * `myOtherModule`: Another custom module. The location of the module has been specified as `/path/to/your/project/components/myOtherModule.js`
* **external**: `jquery` has been specified as an **external require**.
* **watch**: Tell Pecker.Builder to watch all `*.js` files in `src` folder recursively.