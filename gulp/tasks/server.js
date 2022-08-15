export const server = () => app.plugins.browsersync.init({
  server: {
    baseDir: `${app.path.dest.html}`,
  },
  notify: false,
  port: 8080,
});