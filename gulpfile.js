var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var del = require('del');

gulp.task('default', ['clean'], function(){
  gulp.start('index', 'src', 'mocha', 'watch');  
});

gulp.task('src', function () {
   return gulp.src('*/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('build/'));
});

gulp.task('index', function() {
  return gulp.src('index.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('mocha', function(){
  return gulp.src('test/*.js', {read : false}).
    pipe(mocha())
    .once('error', function () {
            process.exit(1);
        })
    .once('end', function(){
        process.exit();
    })
});

gulp.task('watch', function(){
  gulp.watch('lib/*.js', ['src']);
  gulp.watch('index.js', ['index']);
});

gulp.task('clean', function(cb){
  del(['build/*'], cb)
});
