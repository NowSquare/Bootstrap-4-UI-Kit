var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

/*
 |--------------------------------------------------------------------------
 | Default task
 |--------------------------------------------------------------------------
 */

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'copy', 'images');
});

/*
 |--------------------------------------------------------------------------
 | Watch
 |--------------------------------------------------------------------------
 */

gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch .scss files
  gulp.watch('src/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('html/assets/images/**/*', ['images']);

});

gulp.task('watch_styles', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch .scss files
  gulp.watch('src/sass/**/*.scss', ['styles']);

});

/*
 |--------------------------------------------------------------------------
 | Styles
 |--------------------------------------------------------------------------
 */

gulp.task('styles', function() {
  return sass([
      'src/sass/style.scss', 
      'src/sass/bootstrap.scss',
      'src/sass/ekko-lightbox.scss',
      'src/sass/owl.carousel.theme.scss',
      'src/sass/fonts/font-awesome.scss',
      'bower_components/tether/src/css/tether.sass',
      'bower_components/owl.carousel/src/scss/owl.carousel.scss'
    ], {
      style: 'expanded',
      loadPath: [ 
        'src/sass',
        'bower_components/bootstrap/scss'
      ]
    })
    .pipe(autoprefixer({
      browsers: ['last 2 version'], 
      cascade: false
    }))
    .pipe(gulp.dest('html/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('html/assets/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});

/*
 |--------------------------------------------------------------------------
 | Scripts
 |--------------------------------------------------------------------------
 */

gulp.task('scripts', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/tether/dist/js/tether.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/owl.carousel/dist/owl.carousel.js',
      'bower_components/particles.js/particles.js',
      'bower_components/typed.js/js/typed.js',
      'bower_components/flat-surface-shader/deploy/fss.js',
      'src/scripts/**/*.js'
    ])
//    .pipe(jshint('.jshintrc'))
//    .pipe(jshint.reporter('default'))
    //.pipe(concat('scripts.js'))
    .pipe(gulp.dest('html/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('html/assets/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

/*
 |--------------------------------------------------------------------------
 | Images
 |--------------------------------------------------------------------------
 */

gulp.task('images', function() {
  return gulp.src('html/assets/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('html/assets/images'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

/*
 |--------------------------------------------------------------------------
 | Copy
 |--------------------------------------------------------------------------
 */

gulp.task('copy', function(){
  gulp.src('bower_components/font-awesome/fonts/*.*')
    .pipe(gulp.dest('html/assets/fonts/font-awesome'));
});

/*
 |--------------------------------------------------------------------------
 | Cleanup
 |--------------------------------------------------------------------------
 */

gulp.task('clean', function() {
    return del(['html/assets/css', 'html/assets/js', 'html/assets/images']);
});