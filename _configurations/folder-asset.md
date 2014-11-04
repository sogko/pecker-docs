---
layout: documentation
title: "Folder asset"
order: 4
subLevel: 1
---

----

##### folder
Path to the source asset folder.

The path can be an absolute path or relative to the defined [baseDir]({{site.url}}{{site.baseurl}}/configurations/general/#basedir) value.

* Required: `true`
* Possible values: A `string`.
* Example: `"./src/vendor/"`

##### transform
An array of transform values.

* Required: `false`
* Default: `[]`
* Possible values: Built-in transforms names or transform object.

##### include
An array of glob patterns partials of files to include in this folder asset.

The glob pattern partials will be relative to the `folder` value.

For example, if `folder` was set to `./src/vendor/`, a glob pattern partial of `**/*.js` is equivalent to:
`./src/vendor/**/*.js`.

* Required: `false`
* Default: `[]`
* Possible values: An array of glob patterns partial `strings`.
* Examples: `"**/*.js"`, `"**/*"`.

##### exclude
An array of glob patterns partials of files to exclude from this folder asset.

The glob pattern partials will be relative to the `folder` value.

For example, if `folder` was set to `./src/vendor/`, a glob pattern partial of `**/*.js` is equivalent to:
`./src/vendor/**/*.js`.

* Required: `false`
* Default: `[]`
* Possible values: An array of glob patterns partial `strings`.
* Examples: `"**/*.js"`, `"**/*"`.


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

#### Example
Define a folder asset for `bootstrap` vendor source files, including only the `.js` and `.css` files.

{% highlight json %}
{
  "name": "my-project",
  "baseUrl": "/path/to/your/project",
  "destDir": "./dist",
  "assets": [
    {
      "type": "folder",
      "name": "bootstrap",
      "folder": "./src/vendor/bootstrap",
      "include": [
        "**/*.js",
        "**/*.css"
      ],
      "exclude": [
        "**/*.min.js",
        "**/*.min.css",
      ],
      "watch": ["./src/vendor/bootstrap/**/*.*"]
    }
  ]
}
{% endhighlight %}

* **name**: `bootstrap` is the asset name and also will be the name of the generated output folder.
* **folder**: Path of the source folder asset.
* **include**: Include only `.js` and `.css` files.
* **exclude**: Exclude minified `.js` and `.css` files.
* **watch**: Tell Pecker.Builer to watch the folder recursively for changes.