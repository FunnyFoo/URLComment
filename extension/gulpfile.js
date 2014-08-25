// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jade = require('gulp-jade');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'));
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// Watch Files For Changes
gulp.task('watch', function() {
    // gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('*.jade', ['jadehtml']);
});


//jade complie to Html
gulp.task('jadehtml', function() {
  var YOUR_LOCALS = {};

  gulp.src('*.jade')
    .pipe(jade({
        pretty: true,
    }))
    .pipe(gulp.dest('./'))
});


// Default Task
gulp.task('default', ['jadehtml', 'sass', 'watch']);