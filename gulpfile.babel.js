import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import webpack from 'gulp-webpack';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import compiler from 'babel-register';
import config from './webpack.config.babel';

gulp.task('test', function() {
  return gulp.src([
    '!node_modules/**/*.js',
    '!dist/**/*.js',
    '**/*.spec.js'
  ])
  .pipe(mocha({
    require: ['./server/utils/jsdom'],
    reporter: 'nyan',
    timeout: 10000,
    compilers: {
      js: compiler
    }
  }));
});

gulp.task('styles', function() {
  return gulp.src('assets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('images', function() {
  return gulp.src('assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

gulp.task('assets-watch', ['styles', 'images'], function() {
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/images/**/*', ['images']);
});

gulp.task('client-build', function() {
  return gulp.src('client/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('public/js'));
});

gulp.task('server-build', function() {
  return gulp.src(['server/**/*'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('server-run', ['server-build'], function() {
  nodemon({
    script: 'dist/bin/www',
    ext: 'js',
    ignore: [
      'node_modules',
      'public',
      'dist',
    ]
  });
});

gulp.task('default', ['assets-watch', 'client-build', 'server-run']);
