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
import { spawn } from 'child_process';
import config from './webpack.config.babel';

/************************************/
// test tasks

gulp.task('test', function() {
  return gulp.src([
    '!node_modules/**/*.js',
    '!dist/**/*.js',
    '**/*.spec.js'
  ])
  .pipe(mocha({
    require: ['./server/utils/jsdom'],
    timeout: 10000,
    compilers: {
      js: compiler
    }
  }));
});

/************************************/
// asset tasks

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

gulp.task('assets-watch', ['assets-build'], function() {
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/images/**/*', ['images']);
});

gulp.task('assets-build', ['styles', 'images']);

/************************************/
// client tasks

const clientBuild = function() {
  return gulp.src('client/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('public/js'));
};

gulp.task('client-watch', function() {
  config.watch = true;
  return clientBuild();
});

gulp.task('client-build', function() {
  return clientBuild();
});

/************************************/
// server tasks

gulp.task('server-build', function() {
  return gulp.src(['server/**/*'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('server-watch-and-run', ['server-build'], function() {
  nodemon({
    script: 'dist/bin/www',
    ext: 'js',
    tasks: ['server-build'],
    ignore: [
      'node_modules',
      'public',
      'dist',
    ]
  });
});

gulp.task("server-build-and-run", ['server-build'], function() {
  const server = spawn('node', ['dist/bin/www']);
  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);
});

/************************************/
// default task

const development = ['assets-watch', 'client-watch', 'server-watch-and-run'];
const production = ['assets-build', 'client-build', 'server-build-and-run'];

gulp.task('default', process.env.NODE_ENV === 'development' ? development : production);
