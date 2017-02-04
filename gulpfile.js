var autoprefixer = require('gulp-autoprefixer'),
    babel = require("gulp-babel"),
    cleanCSS = require('gulp-clean-css'),
    combineMq = require('gulp-combine-mq'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    csso = require('gulp-csso'),
    del = require('del'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    sorting = require('postcss-sorting'),
    sourcemaps = require('gulp-sourcemaps'),
    mergerules = require('postcss-merge-rules'),
    paths = {
      scripts: 'src/js/**/*.js',
      styles: 'src/scss/*.scss'
    },
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify');

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['src/js/build, src/scss/build']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript
  // with sourcemaps all the way down
  return gulp.src([
      'src/js/*.js'
    ])
    .pipe(sourcemaps.init())
      .pipe(babel({
        compact: false
      }))
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(gulp.dest('assets/js/build'))
    .pipe(livereload());
});

gulp.task('styles', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down

  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(combineMq({
      beautify: false
    }))
    .pipe(concatCss("bundle.css"))
    .pipe( cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src/scss/build'))
    .pipe(livereload());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'styles']);

