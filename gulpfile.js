const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const browsersync = require('browser-sync').create()

//sass
gulp.task('sass', () => {
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browsersync.stream())
})

// pug
gulp.task('pug', () => {
  return gulp.src('dev/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
})

//watch
gulp.task('default', () => {
  gulp.watch('dev/**/*.pug', gulp.series('pug'))
  gulp.watch('dev/scss/**/*.scss', gulp.series('sass'))
  //自動リロード
  gulp.watch('dist/**/*.html').on('change', browsersync.reload)
  browsersync.init({
    server: {
      baseDir: './dist'
    }
  })
})

