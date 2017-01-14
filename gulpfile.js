const gulp = require('gulp'),
  del = require('del'),
  plugins = require('gulp-load-plugins')();

const paths = {
  pug: 'pages/*.pug',
  pugWatch: [
    'blocks/**/*.pug',
    'pages/*.pug'
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
  css: 'bower_components/normalize-css/normalize.css',
  fonts: 'blocks/logotype/font/*.{eot,svg,ttf,woff}',
  build: 'build'
};

const clean = () => del([ paths.build ]);

// Get one .styl file and render
function css() {
  return gulp.src(paths.less)
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .pipe(gulp.dest(paths.build + '/css'));
}

function html() {
  return gulp.src(paths.pug)
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build))
}

function copyImages() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + '/img'))
}

function copyCss() {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.build + '/css'))
}

function copyFonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + '/fonts'))
}

const copy = gulp.parallel(copyImages, copyCss, copyFonts);


// Rerun the task when a file changes
function watch() {
  gulp.watch(paths.lessWatch, css);
  gulp.watch(paths.pugWatch, html);
}

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series(html, css, copy, watch));

gulp.task('deploy', () =>
  gulp.src('./build/**/*')
    .pipe(plugins.ghPages())
);
