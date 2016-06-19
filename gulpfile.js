var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var babel = require('babel-core/register');

gulp.task('test', function() {
  return gulp.src([
    '!node_modules/**/*.js',
    '**/*.spec.js'
  ])
  .pipe(mocha({
    require: ['./utils/jsdom'],
    reporter: 'nyan',
    timeout: 10000,
    compilers: {
      js: babel
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

gulp.task('assets-watch', function() {
  gulp.watch('assets/scss/*.scss', ['styles']);
  gulp.watch('assets/images/*', ['images']);
});

gulp.task('webpack-watch', function() {
  var config = require('./webpack.config.js');
  config.watch = true;
  return gulp.src('app/main.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('public/js'));
});

gulp.task('run', function() {
  nodemon({
    script: 'bin/www',
    ext: 'js',
    ignore: [
      'node_modules',
      'public'
    ]
  });
});

gulp.task('default', ['webpack-watch', 'assets-watch', 'run']);
