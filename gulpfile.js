const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// Task to compile all JavaScript files using ES6 into ES5
gulp.task('js', function () {
  // gulp.src(['./js/services/mainService.js', './js/adventurerCard.js', './js/'])       Bad way
  // Use a wildcard instead. Wildcard = *
  gulp.src(['./public/js/app.js', './public/js/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/dist'));
});


// Task to compile all Sass files into CSS
gulp.task('sass', function () {
  gulp.src([
    './public/styles/*.*css'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./public/dist'));
});

// Task to watch all files for changes
// Specify which files you want Gulp to 'watch'. As soon as changes occur to any files, run the task passed inside the brackets
gulp.task('watch', function () {
  // Watch for js changes
  gulp.watch('./public/js/**/*.js', ['js']);
  // Watch for css/scss changes
  gulp.watch('./public/styles/*.*css', ['sass'])
})

// Default Gulp Task. 
gulp.task('default', ['js', 'sass', 'watch']);

// To execute, run 'gulp' in the terminal and make changes to a js/css file to ensure everything is being watched correctly.
// Don't forget to change the paths in your index.html to point to the bundle.css/bundle.js

// Gulp watch
// takes two arguments: the file(s) to watch, and then the task to do if it notices a change.
