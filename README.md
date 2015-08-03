# Ember-cli-deploy-cp

> An ember-cli-deploy-plugin to copy your built assets on your filesystem

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

This plugin uses [cpr][1] to copy built assets on your filesystem. It basically supports all its options.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][2].

## Quick Start
To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build][3] is installed and configured.

- Install this plugin

```bash
$ ember install ember-cli-deploy-cp
```

- Place the following configuration into `config/deploy.js`

```javascript
ENV.cp {
  destDir: '/srv/www/htdocs/'
}
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-cp
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][2].

- `configure`
- `upload`
- `didDeploy`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][2].

### destDir

The root directory to which the contents of the [distDir](#distdir) will be copied to.

*Required*

### distDir

The root directory that will be used as source directory for cpr. By default, this option will use the `distDir` property of the deployment context.

*Default:* `context.distDir`

### didDeployMessage

A message that will be displayed after the distDir has been copied to destDir.

*Default:*

```javascript
if (context.revisionKey) {
  return "Copied revision " + context.revisionKey + ".";
}
```

### deleteFirst

Delete the [destDir](#destdir) with `rimraf` before the files are copied.

*Default:* `false`

### overwrite

If the destination exists, overwrite it.

*Default:* `false`

### confirm

After the copy operation, stat all the files and report errors if any are missing.

*Default:* `true`

### filter

`RegExp` or `function` to test each file against before copying.

*Default:* `undefined`


## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`                     (provided by [ember-cli-deploy-build][3])

## Running Tests

- `npm test`

## TODO

Tests ... right?

[1]: https://github.com/davglass/cpr "cpr"
[2]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[3]: https://github.com/zapnito/ember-cli-deploy-build "ember-cli-deploy-build"
