'use strict';

var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var jf = require('jsonfile');
var childProcess = require('child_process');
var Pecker = require('pecker');
var map = require('vinyl-map');
var rename = require('gulp-rename');
var fs = require('fs-extra');
var flatten = require('gulp-flatten');
var Handlebars = require('handlebars');

// register package asset tag helper
Handlebars.registerHelper('PeckerAsset', function (options) {
  var manifest = jf.readFileSync('./dist/manifest.json');
  var peckerAssets = new Pecker.Assets(manifest);
  return new Handlebars.SafeString(peckerAssets.constructAssetHTML(options.hash.name, options.hash));
});

function createDynamicBlockScriptRequires(opts, done) {

  // find 'siteEngine' asset definition
  var siteEngineAssetOptions = null;
  for (var i = 0; i < opts.assets.length; i++) {
    var asset = opts.assets[i];
    if (asset.name === 'site.js') {
      siteEngineAssetOptions = asset;
    }
  }
  if (!siteEngineAssetOptions) {
    return done(opts, siteEngineAssetOptions);
  }

  // dynamically add more `require` for 'siteEngine' asset
  // glob all *.js in `src/site/` and create a `require` definition for module.
  var basePath = './src/site/';
  glob('**/*.js', {
    cwd: basePath
  }, function (err, files) {
    for (var i = 0; i < files.length; i++) {
      var location = path.join(basePath, files[i]);
      var filename = path.basename(location, path.extname(location));
      var name = path.join(path.dirname(files[i]), filename);

      // define require for module
      var require = {
        type: 'module',
        name: name,
        location: location
      };
      if (!siteEngineAssetOptions.require) {
        siteEngineAssetOptions.require = [];
      }
      siteEngineAssetOptions.require.push(require);
    }

    if (done) {
      done(opts, siteEngineAssetOptions);
    }

  });
}

gulp.task('test', function () {
  var opts = jf.readFileSync('./pecker.json');
  createDynamicBlockScriptRequires(opts, function (newOpts, siteEngineAssetOptions) {
    console.log(siteEngineAssetOptions);
    console.log('done');
  });

});

gulp.task('build', function (done) {

  var opts = jf.readFileSync('./pecker.json');
  createDynamicBlockScriptRequires(opts, function (newOpts) {

    var builder = new Pecker.Builder(newOpts);
    builder.buildAssets(function () {
      done();
    });

  });

});

function parseIncludeTemplates() {
  gulp.src('./src/site/includes/**/_*.html')
    .pipe(map(function (content) {
      var template = Handlebars.compile(content.toString());
      return template({});
    }))
    .pipe(rename(function (path) {
      // remove '_' underscore prefix
      path.basename = path.basename.substr(1);
    }))
    .pipe(gulp.dest('./_includes'));
}
function copyBlocksIncludeHTML() {
  gulp.src('./src/site/blocks/**/*.html')
    .pipe(gulp.dest('./_includes'));
}
function copyLayoutHTML() {
  gulp.src('./src/site/layouts/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('./_layouts'));
}
function copyIncludeHTML() {
  gulp.src(['./src/site/includes/*.html', '!./src/site/includes/_*.html'])
    .pipe(gulp.dest('./_includes'));
}
function copyPagesHTML() {
  gulp.src(['./src/site/pages/**/*.html'])
    .pipe(gulp.dest('./'));
}

gulp.task('parseIncludeTemplates', ['build'], function () {
  parseIncludeTemplates();
});

gulp.task('parseIncludeTemplates:standalone', function () {
  parseIncludeTemplates();
});

gulp.task('copyIncludes', function () {
  copyIncludeHTML();
});

gulp.task('copyBlocks', function () {
  copyBlocksIncludeHTML();
});

gulp.task('copyLayouts', function () {
  copyLayoutHTML();
});

gulp.task('copyPages', function () {
  copyPagesHTML();
});

gulp.task('watch', function () {
  var opts = jf.readFileSync('./pecker.json');
  var builder = new Pecker.Builder(opts);
  builder.watchAssets({
    changed: function () {
      console.log('changed');
    },
    complete: function () {
      console.log('complete');
      gulp.start('parseIncludeTemplates:standalone');
      gulp.start('copyIncludes');
      gulp.start('copyBlocks');
      gulp.start('copyLayouts');
      gulp.start('copyPages');
      gulp.start('jekyll:build:standalone');
    }
  });

  gulp.watch('./src/site/blocks/**/*.html', ['copyBlocks']);
  gulp.watch('./src/site/layouts/**/*.html', ['copyLayouts']);
  gulp.watch('./src/site/**/*.js', function () {

    var opts = jf.readFileSync('./pecker.json');

    createDynamicBlockScriptRequires(opts, function (newOpts, siteEngineAssetOptions) {
      var builder = new Pecker.Builder(newOpts);
      builder.buildBrowserifyAsset(siteEngineAssetOptions, function () {
        console.log('built siteEngine');
      });
    });
  });
});

gulp.task('clean', function () {
  fs.removeSync('./dist');
  fs.removeSync('./_site');
  fs.removeSync('./_includes');
  fs.removeSync('./_layouts');

  glob('**/*.html', {
    cwd: './src/site/pages'
  }, function (err, files) {
    for (var i = 0; i < files.length; i++) {
      var dirname = path.dirname(files[i]);
      fs.removeSync(files[i]);
      if (dirname !== '.') {
        fs.removeSync(dirname);
      }
    }
  });
});

gulp.task('jekyll:build', ['parseIncludeTemplates', 'copyIncludes', 'copyBlocks', 'copyLayouts'], function () {
  childProcess.spawn('jekyll', ['build'], {stdio: 'inherit'});
});

gulp.task('jekyll:build:standalone', ['parseIncludeTemplates:standalone', 'copyIncludes', 'copyBlocks', 'copyLayouts'], function () {
  childProcess.spawn('jekyll', ['build'], {stdio: 'inherit'});
});


gulp.task('default', ['clean', 'build', 'parseIncludeTemplates', 'copyIncludes', 'copyBlocks', 'copyLayouts', 'copyPages', 'jekyll:build']);