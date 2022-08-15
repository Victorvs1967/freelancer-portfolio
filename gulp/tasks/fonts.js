import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2woff from 'gulp-ttf2woff';

export const otfToTtf = () => app.gulp.src(`${app.path.src.fonts}*.otf`)
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: 'FONTS',
    message: 'Error: <%= error.message %>'
  })))
  .pipe(fonter({
    formats: ['ttf'],
  }))
  .pipe(app.gulp.dest(`${app.path.src.fonts}`));

export const ttfToWoff = () => app.gulp.src(app.path.src.fonts)
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: 'FONTS',
    message: 'Error: <%= error.message %>'
  })))
  .pipe(ttf2woff())
  .pipe(app.gulp.dest(app.path.dest.fonts))
  .pipe(app.gulp.src(app.path.src.fonts))
  .pipe(ttf2woff2())
  .pipe(app.gulp.dest(app.path.dest.fonts));

export const fontsStyle = async () => {
  const cb = () => {};
  const fontsFile = `${app.path.srcFolder}/styles/_fonts.sass`;
  fs.readdir(app.path.dest.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() == 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() == 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() == 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() == 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() == 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() == 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() == 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() == 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile,
              `@font-face\n\tfont-family: ${fontName}\n\tfont-display: swap\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff")\n\tfont-weight: ${fontWeight}\n\tfont-style: normal\n\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log('file styles/_fonts.sass already exist...');
      }
    }
  });
  return app.gulp.dest(`${app.path.srcFolder}`);
};