var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');

const appPath = './app.js';
gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
    script: appPath
  })
    .on('start', () => {
      if (!started) {
        started = true;
        return cb();
      }
    })
    .on('restart', () => {
      console.log('restarting');
    });

});

gulp.task('test', ['nodemon'], function() {
  return gulp.src('./test/index.js')
    .pipe(mocha({reporter: 'spec' }))
    . once('error', function() {
        process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});
gulp.task('watch', () => {
  gulp.watch(appPath, ['test'])
});
gulp.task('default', ['test'])
