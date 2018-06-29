/*
  clean.js
  ===========
  removes folders:
    - public
<<<<<<< HEAD
    - govuk_modules
=======
>>>>>>> cc5645e6396fb094284beabc9ee6550b91e6b21a
*/

const gulp = require('gulp')
const clean = require('gulp-clean')

const config = require('./config.json')

gulp.task('clean', function () {
  return gulp.src([config.paths.public + '/*',
    // config.paths.govukModules + '/*',
    '.port.tmp'], {read: false})
  .pipe(clean())
})
