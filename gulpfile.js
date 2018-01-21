var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//comp sass into css & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

// move js files into /src/js folder
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js'])
      .pipe(gulp.dest("src/js"))
      .pipe(browserSync.stream());
});

// static server + watch
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      server: "./src"
  });
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);
