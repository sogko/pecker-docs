---
layout: documentation
title: "File asset"
order: 3
subLevel: 1
---

----

##### files
An array of file paths or glob patterns that will be pushed into the transform stream and concatenated into a single file asset.

Both the paths and patterns can be absolute paths or relative to the defined [baseDir]({{site.url}}{{site.baseurl}}/configurations/general/#basedir) value.

* Required: `true`
* Possible values: A `string` or an array of `strings` of file paths or glob patterns.
* Examples: `"./src/script.js"`, `["./src/**/*.js"]`.

##### transform
An array of transform values.

* Required: `false`
* Default: `[]`
* Possible values: Built-in transforms names or transform object.

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


#### Example `file` asset configuration
Transform all `*.scss` SASS files from a folder and produce a single `site.css` file asset
{% highlight json %}
{
  "name": "my-project",
  "baseDir": "/path/to/your/project",
  "baseUrl": "/assets",
  "destDir": "./dist",
  "assets": [
    {
      "type": "file",
      "name": "site.css",
      "files": ["./src/**/*.scss"],
      "transform": [
        "sass",
        "clean-css"
      ],
      "watch": ["./src/**/*.scss"]
    }
  ]
}
{% endhighlight %}

* **name**: `site.css` is the asset name and also will be the filename of the generated output file.
* **files**: Get all `*.scss` files from `src` folder recursively.
* **transform**: Apply the following transformation in order:
  1. Apply `sass` transform to produce `css` output.
  2. Followed by `clean-css` transform to produce minified `css` output.
  3. At the end of the transform stream, the output will be automatically be concatenated to a single file with the filename `site.css`.
* **watch**: Tell Pecker.Builder to watch all `*.scss` files in `src` folder recursively.