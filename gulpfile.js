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
var beautifyHTML = require('js-beautify').html;

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
    console.log(siteEngineAssetOptions);

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
gulp.task('parseIncludeTemplates', ['build'], function () {
  parseIncludeTemplates();
});
// don't trigger full build
gulp.task('parseIncludeTemplates:standalone', function () {
  parseIncludeTemplates();
});

function copyBlocksIncludeHTML(dest) {
  gulp.src('./src/site/blocks/**/*.html')
    .pipe(gulp.dest(dest || './_includes'));
}
gulp.task('copyBlocks', function () {
  copyBlocksIncludeHTML();
});

function copyLayoutHTML(dest) {
  gulp.src('./src/site/layouts/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest(dest || './_layouts'));
}
gulp.task('copyLayouts', function () {
  copyLayoutHTML();
});

function copyIncludeHTML(dest) {
  gulp.src(['./src/site/includes/*.html', '!./src/site/includes/_*.html'])
    .pipe(gulp.dest(dest || './_includes'));
}
gulp.task('copyIncludes', function () {
  copyIncludeHTML();
});

function copyPagesHTML(dest) {
  gulp.src(['./src/site/pages/**/*.html'])
    .pipe(gulp.dest(dest || './'));
}
gulp.task('copyPages', function () {
  copyPagesHTML();
});

function copyDistFiles(dest) {
  gulp.src(['./src/dist/**/*'])
    .pipe(gulp.dest(dest || './_site/dist'));
}
gulp.task('copyDist', function () {
  copyDistFiles();
});

gulp.task('watch', function () {
  var opts = jf.readFileSync('./pecker.json');
  var builder = new Pecker.Builder(opts);
  builder.watchAssets({
    changed: function () {
      console.log('changed');
    },
    complete: function () {
      gulp.start('jekyll:build:standalone');
    }
  });

  gulp.watch('./src/site/blocks/**/*.html', ['jekyll:build:standalone']);
  gulp.watch('./src/site/layouts/**/*.html', ['jekyll:build:standalone']);
  gulp.watch('./src/site/pages/**/*.html', ['jekyll:build:standalone']);

  // implement watch instructions separately
  gulp.watch('./src/site/**/*.js', function () {

    var opts = jf.readFileSync('./pecker.json');
    createDynamicBlockScriptRequires(opts, function (newOpts, siteEngineAssetOptions) {
      var builder = new Pecker.Builder(newOpts);
      builder.buildBrowserifyAsset(siteEngineAssetOptions, function () {
        console.log('built siteEngine');
        gulp.start('jekyll:build:standalone');
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

gulp.task('jekyll:build', ['parseIncludeTemplates', 'copyIncludes', 'copyBlocks', 'copyLayouts', 'copyPages'], function () {
  childProcess.spawn('jekyll', ['build'], {stdio: 'inherit'});
});

gulp.task('jekyll:build:standalone', ['parseIncludeTemplates:standalone', 'copyIncludes', 'copyBlocks', 'copyLayouts', 'copyPages', 'copyDist'], function () {
  childProcess.spawn('jekyll', ['build'], {stdio: 'inherit'});
});

gulp.task('beautifyHTML', function () {
  gulp.src(['./_site/**/*.html'])
    .pipe(map(function (content) {
      return beautifyHTML(content.toString(), {
        indent_size: 2,
        preserve_newlines: false
      });
    }))
    .pipe(gulp.dest('./_site'));
});

gulp.task('default', ['clean', 'build', 'jekyll:build']);