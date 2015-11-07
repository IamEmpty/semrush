var gulp = require('gulp'),
  jade = require('gulp-jade'),
  less = require('gulp-less'),
  plumber = require('gulp-plumber');

var paths = {
  jade: 'pages/*.jade',
  jadeWatch: [
    'blocks/**/*.jade',
    'pages/*.jade'
  ],
  less: 'stylesheets/main.less',
  lessWatch: [
    'blocks/**/*.less',
    'stylesheets/main.less'
  ],
  images: [
    'blocks/articles/**/*.{png,jpg}',
    'blocks/profile/**/*.{png,jpg}'
  ],
  css: 'bower_components/normalize.css/normalize.css',
  fonts: 'blocks/logotype/font/*.{eot,svg,ttf,woff}',
  build: 'build'
};

// Get one .styl file and render
gulp.task('css', function() {
  return gulp.src(paths.less)
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('html', function() {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('copy', ['copy-images', 'copy-css', 'copy-fonts']);

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + '/img'))
});

gulp.task('copy-fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + '/fonts'))
});

gulp.task('copy-css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.build + '/css'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.lessWatch, ['css']);
  gulp.watch(paths.jadeWatch, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['html', 'css', 'watch', 'copy']);
