// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var del = require('del');

var srcFiles = {
  main: 'src/**',
  jade: 'src/views/**/*.jade',
  sass: 'src/sass/**/*.sass',
  js: 'src/scripts/**/*.js',
  asset: 'src/assets/**'
};

var buildDir = {
  main: 'build',
  view: 'build/views',
  style: 'build/stylesheets',
  script: 'build/scripts'
};

gulp.task('clear', function() {
  del.sync(buildDir.main);
});

gulp.task('lib', function() {
  return gulp.src(srcFiles.asset, { base: 'src/assets' })
    .pipe(gulp.dest(buildDir.main));
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src(srcFiles.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify({ compress: true }))
    .pipe(sourcemaps.write({
      addComment: true,
      sourceRoot: 'src'
    }))
    .pipe(gulp.dest(buildDir.script));
});

// Compass
gulp.task('compass', function() {
  var stream = gulp.src(srcFiles.sass)
    .pipe(compass({
      css: 'build/stylesheets',
      sass: 'src/sass'
    })).on('error', function (err) {
      gutil.log(gutil.colors.yellow(err.message));
      notify.onError({
        title: 'Gulp',
        message: "Error: <%= error.message %>",
        sound: 'Pop'
      }) (err);
      notify(err.message);
      stream.end();
    })
    .pipe(gulp.dest(buildDir.style));

  return stream;
});

// Jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  return gulp.src(srcFiles.jade)
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest(buildDir.main));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(srcFiles.asset, ['lib']);
  gulp.watch(srcFiles.sass, ['compass']);
  gulp.watch(srcFiles.js, ['lint']);
  gulp.watch(srcFiles.jade, ['jade']);
});

gulp.task('compile', ['jade', 'compass', 'lint']);
gulp.task('build', ['clear', 'compile', 'lib']);
// Default Task
gulp.task('default', ['build', 'watch']);
