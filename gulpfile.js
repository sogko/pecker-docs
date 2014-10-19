'use strict';

var gulp = require('gulp');
var jf = require('jsonfile');
var Pecker = require('pecker');
var liquid = require('gulp-liquid');
var fs = require('fs-extra');
var flatten = require('gulp-flatten');

gulp.task('build', function (done) {
  var opts = jf.readFileSync('./pecker.json');
  var builder = new Pecker.Builder(opts);
  builder.buildAssets(function () {
    done();
  });
});

function parseIncludeTemplates() {
  var manifest = jf.readFileSync('./dist/manifest.json');
  var peckerAssets = new Pecker.Assets(manifest);
  gulp.src('./src/site/includes/*.html')
    .pipe(liquid({
      locals: {
        links: peckerAssets.constructAssetHTML('assets', { type: 'link' }),
        scripts: peckerAssets.constructAssetHTML('assets', { type: 'script' })
      }
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
gulp.task('template', ['build'], function () {
  parseIncludeTemplates();
});
gulp.task('template:standalone', function () {
  parseIncludeTemplates();
});

gulp.task('copyBlocks', function () {
  copyBlocksIncludeHTML();
});
gulp.task('copyLayouts', function () {
  copyLayoutHTML();
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
      gulp.start('template:standalone');
      gulp.start('copyBlocks');
      gulp.start('copyLayouts');
    }
  });

  gulp.watch('./src/site/blocks/**/*.html', ['copyBlocks']);
  gulp.watch('./src/site/layouts/**/*.html', ['copyLayouts']);
});
gulp.task('clean', function () {
  fs.removeSync('./dist');
  fs.removeSync('./_site');
  fs.removeSync('./_includes');
  fs.removeSync('./_layouts');
});
gulp.task('default', ['clean', 'build', 'template', 'copyBlocks', 'copyLayouts']);