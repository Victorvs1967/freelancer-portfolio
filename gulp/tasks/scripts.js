import webpack from 'webpack-stream';

export const scripts = () => app.gulp.src(app.path.src.scripts, { sourcemap: app.isDev })
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: 'JS',
    message: 'Error: <%= error.message %>'
  })))
  .pipe(app.plugins.replace(/@img\//g, '../img/'))
  .pipe(webpack({
    mode: app.isBuild ? 'production' : 'development',
    output: {
      filename: 'main.min.js',
    }
  }))
  .pipe(app.gulp.dest(app.path.dest.scripts))
  .pipe(app.plugins.browsersync.stream());