---
layout: documentation
title: "Pecker CLI"
order: 3
---

----

#### Using Pecker as a command-line program

The `pecker` command-line interface (CLI) comes with a series of options.

Use `pecker help` from your terminal to show help information of available options.

----

### Usage

```
pecker <action> [<args>] [<options>]
```

----


### Actions

###### add
Interactively add a new asset definition in `pecker.json`.

###### build
Build all assets defined in `pecker.json`.

###### help
Display help information about **Pecker**.

###### init
Interactively create a `pecker.json`.

###### watch
Watch all assets defined in `pecker.json` and build on changes.



### Options

###### -c, --config
Path to Pecker config file.

Default: Current directory where `pecker` was run from.

###### -s, --silent
Suppress all log messages (including error messages).

Default: `false`.

