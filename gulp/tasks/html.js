import include from 'gulp-file-include';
import webp from 'gulp-webp-html-nosvg';
import version from 'gulp-version-number';
import pug from 'gulp-pug';

export const html = () => app.gulp.src(app.path.src.html)
.pipe(app.plugins.plumber(app.plugins.notify.onError({
  title: "HTML",
  message: "Error: <%= error.message %>"
})))
  // .pipe(include())
  .pipe(pug({
    doctype: 'html',
    pretty: true,
    verbose: true,
  }))
  .pipe(app.plugins.replace(/@img\//g, 'img/'))
  .pipe(app.plugins.if(app.isBuild, webp()))
  .pipe(app.plugins.if(app.isBuild, version({
    'value': '%DT%',
    'append': {
      'key': '_v',
      'cover': 0,
      'to': [
        'css',
        'js',
      ],
    },
    'output': {
      'file': 'gulp/version.json'
    }
  })))
  .pipe(app.gulp.dest(app.path.dest.html))
  .pipe(app.plugins.browsersync.stream());