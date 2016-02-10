/**
 * gulpfile.js
 * Created by dcorns on 12/29/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var gulp = require('gulp');
var exec = require('child_process').exec;
var cssnext = require('gulp-cssnext');
var postcss = require('gulp-postcss');
var processors = [require('postcss-cssnext')];
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('gulp-webpack');

gulp.task('webpack', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(webpack({
      output:{
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('Development'));
});

gulp.task('webpack:prod', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(webpack({
      output:{
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('static/js'));
});

gulp.task('copyassets', function(){
  gulp.src(['app/assets/**/*'])
    .pipe(gulp.dest('Development'));
});

gulp.task('server', function(){
    exec('supervisor -w server.js, api server Development', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('dev-server', function(){
  exec('WEB_ROOT=$PWD/Development node server', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('run-dev', function(){
  exec('export WEB_ROOT=/data/Projects', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('run-prod', function(){
  exec('$WEB_ROOT=' + __dirname + 'app/Production/', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build-css', function(){
  return gulp.src('app/styles/**/*')
    .pipe(concatCss('main.css'))
    .pipe(cssnext({
      compress: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('Development'));
});

gulp.task('watcher', function(){
  gulp.watch('app/js/**/*', ['webpack']);
  //Keep Development build folder assets in sync
  gulp.watch('app/assets/**/*',['copyassets']);
  gulp.watch('app/index.html', function(){
    gulp.src(['app/index.html'])
      .pipe(gulp.dest('Development'));
  });
  gulp.watch('app/styles/**/*',['build-css']);
});

gulp.task('default',['watcher', 'server']);