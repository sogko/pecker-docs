---
layout: documentation
title: "Asset configuration"
order: 2
---

----


##### name
Unique name to identify your asset.

Usually, this would be the filename or folder name of the asset, or a package name.

* Required: `true`
* Possible values: Any valid JSON key `string`.
* Examples: `"site.js"`, `"site.css"`, `"jquery"`.
* Note: An asset name is expected to be unique within a Pecker configuration. If there are duplicate assets with the same name, only one asset configuration will be used.

##### type
Asset type.

Depending on the asset type, additional options would be required.

* Required: `true`
* Possible values:
    * `"file"`
    * `"folder"`
    * `"browserify"`
    * `"url"`
    * `"package"`
