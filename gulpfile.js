const gulp = require('gulp');

gulp.task('copy-json', () => {
  return gulp.src('l8n/**/*.json')
  .pipe(
    gulp.dest('dist/l8n')
  )
});

gulp.task('l8n', gulp.series('copy-json'));
