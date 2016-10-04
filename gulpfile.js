var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
// var concat = require('gulp-concat'); use to concat js files into one
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var pump = require('pump');

// De-caching for Data files
function requireUncached( $module ) {
  delete require.cache[require.resolve( $module )];
  return require( $module );
}

gulp.task('buildHTML', function(cb) {
  pump([
      gulp.src('app/pages/**/*.+(html|nunjucks)'),
      data(function() {
        return requireUncached('./app/data.json');
      }),
      nunjucksRender({
        path: ['app/templates']
      }),
      gulp.dest('build')
    ],
    cb
  );
});

gulp.task('buildHTML-Watch', function() {
  gulp.watch(['app/**/*.+(html|nunjucks)', 'app/data.json'], ['buildHTML']);
});


gulp.task('buildCSS', function(cb) {
  pump([
      gulp.src('app/css/**/*.css'),
      gulp.dest('build/css')
    ],
    cb
  );
});

gulp.task('buildCSS-Watch', function() {
  gulp.watch('app/css/**/*.css', ['buildCSS']);
});

gulp.task('buildJS', function(cb) {
  pump([
      gulp.src('app/js/main/**/*.js'),
      babel({
          presets: ['es2015']
      }),
      uglify(),
      gulp.dest('build/js/main')
    ],
    cb
  );
});

gulp.task('buildJS-Watch', function() {
  gulp.watch('app/js/main/**/*.js', ['buildJS']);
});

gulp.task('buildImg', function(cb) {
  pump([
      gulp.src('app/img/**/*'),
      gulp.dest('build/img')
    ],
    cb
  );
});

gulp.task('buildImg-Watch', function(cb) {
  gulp.watch('app/img/**/*', ['buildImg']);
});

gulp.task('build', ['buildCSS', 'buildHTML', 'buildJS', 'buildImg']);
gulp.task('buildWatch', ['build', 'buildCSS-Watch', 'buildHTML-Watch', 'buildJS-Watch', 'buildImg-Watch']);
