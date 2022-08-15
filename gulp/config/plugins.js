import browsersync from 'browser-sync';
import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import gulpIf from 'gulp-if';

export const plugins = {
  browsersync: browsersync,
  replace: replace,
  plumber: plumber,
  notify: notify,
  newer: newer,
  if: gulpIf,
};