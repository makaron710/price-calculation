const {src, dest, watch, series}        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');

// Compile sass into CSS & auto-inject into browsers | компилятор sass в css
function serveSass() {
    return src("./sass/**/*.sass", "./scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({cascade: false}))
        .pipe(dest("./css"))
        .pipe(browserSync.stream());
};

// Static server | сервер для авто обновления страницы
function bs() {
    serveSass();
     browserSync.init({
      server: {
          baseDir: "./"
      }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./scss/**/*.scss", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);
    watch("*.js").on('change', browserSync.reload);
};

//JS
function buildJS(done) {
    src(['js/**/**.js', '!js/**/**.min.js'])
        .pipe(minify({
            ext:{
                min:'.js'
            }
        }))
        .pipe(dest('dist/js/'));
    src('js/**/**.min.js')
        .pipe(dest('dist/js/'));
    done();
};

exports.bs = bs; //вызов таска командой gulp bs
//exports.minCss = minCss;
/* exports.build = series(buildCSS, buildJS, buildHTML, php, fonts);
exports.imgmin = imgMin; */
