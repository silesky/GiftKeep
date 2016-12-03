const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const spawn = require('child_process').spawn,
node = spawn('node', ['app.js'], {stdio: 'inherit'})
// make test dependent on nodemon
const tester = () => {
  gulp.src('./test/index.js')
      .pipe(mocha({
        clearRequireCache: true,
        ignoreLeaks: true
        })
      .on('error', () => {
        node.kill()
        nodemoner()
      })
    );
}
gulp.task('test', ['nodemon'], tester);


const nodemoner = () => {
    nodemon({
     // exec: 'node-inspector & node --debug',
      script: 'app.js',
      ext: 'js json',
      debug: true,
      env: { 'NODE_ENV': 'development' }
  })
    .on('restart', () => {
      setTimeout(tester, 3000)
    })
    .on('crash', () => {
     console.log('___CRASHED___');
     node.kill()
     setTimeout(tester, 15000)
  })
  .on('error', () => {

        console.log('___CRASHED___');
        node.kill()
         setTimeout(tester, 5000)
  })
  }
gulp.task('nodemon', nodemoner);
gulp.task('default', ['nodemon']);


