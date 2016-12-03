const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

// make test dependent on nodemon

gulp.task('test', ['nodemon'], () => {
  return gulp.src('./test/index.js')
      .pipe(mocha({
        clearRequireCache: true,
        ignoreLeaks: true
        }));
});
gulp.task('nodemon', () => {
    nodemon({
      exec: 'node-inspector & node --debug',
      script: 'app.js',
      ext: 'js json',
      tasks: ['test'],
      verbose: true,
      env: { 'NODE_ENV': 'development' }
  })
  .on('restart', ['test'])
});

gulp.task('default', ['nodemon']);


