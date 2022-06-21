import gulp from "gulp";
import clean from "gulp-clean";
import browserSync from "browser-sync";
import concat from "gulp-concat";
import cleancss from "gulp-clean-css";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import imagemin from "gulp-imagemin";
import autoprefixer from "gulp-autoprefixer";
import htmlmin from "gulp-htmlmin";
import minify from "gulp-minify";

const sass = gulpSass(dartSass);
const bS = browserSync.create();

//BUILD STYLES

const buildStyles = () =>
  gulp
    .src("./src/styles/*.scss")
    .pipe(sass())

    .pipe(concat("styles.min.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleancss())
    .pipe(gulp.dest("./dist/css"));

//MIN IMGS

const minImg = () =>
  gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));

//HTML MIN

const htmlMin = () =>
  gulp
    .src("./*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./"));

//AUTO PREF

const autoPref = () =>
  gulp
    .src("./dist/css/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/css"));

//CLEAN DIST

const cleanDist = () => gulp.src("./dist/*", { read: true }).pipe(clean());

//JS

const concatMinJs = () =>
  gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(minify({ noSource: true }))
    .pipe(gulp.dest("./dist/js"));

//EXPORT

export const dev = gulp.series(minImg, buildStyles, () => {
  bS.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(
    "./src/**/*",
    gulp.series(buildStyles, (done) => {
      bS.reload();
      done();
    })
  );
});

export const build = gulp.series(
  cleanDist,
  concatMinJs,
  minImg,
  buildStyles,
  autoPref,
  htmlMin
);
