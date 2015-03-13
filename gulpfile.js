'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src(['test/test*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('watch-test', function () {
    gulp.watch(['index.js', 'test/**'], ['test']);
})

gulp.task('watch', ['watch-test']);
