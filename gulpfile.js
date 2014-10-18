'use strict';

var gulp = require('gulp');
var jf = require('jsonfile');
var Pecker = require('pecker');
var liquid = require('gulp-liquid');

gulp.task('build', function (done) {
  var opts = jf.readFileSync('./pecker.json');
  var builder = new Pecker.Builder(opts);
  builder.buildAssets(function () {
    done();
  });
});

function runTemplate() {
  var manifest = jf.readFileSync('./dist/manifest.json');
  var peckerAssets = new Pecker.Assets(manifest);
  gulp.src('./_includes/pecker/*.html')
    .pipe(liquid({
      locals: {
        links: peckerAssets.constructAssetHTML('assets', { type: 'link' }),
        scripts: peckerAssets.constructAssetHTML('assets', { type: 'script' })
      }
    }))
    .pipe(gulp.dest('./_includes'));
}
gulp.task('template', ['build'], function () {
  runTemplate();
});
gulp.task('template:standalone', function () {
  runTemplate();
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
    }
  });
});
gulp.task('default', ['build', 'template']);