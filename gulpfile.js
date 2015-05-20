var gulp = require('gulp'),
    sass = require('gulp-sass'),
    importCss = require('gulp-import-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    rsync = require('gulp-rsync');

/**************************** Used to take care of the css/scss **********************/
gulp.task('css', [], function() {
   return gulp.src('sass/style.scss')
       .pipe(sass())
       .pipe(importCss())
       .pipe(autoprefixer())
       .pipe(minifyCss({keepBreaks:false}))
       .pipe(rename('style.min.css'))
       .pipe(gulp.dest('lib/css/'))
       .pipe(browserSync.reload({stream:true}));
});

// minifiy images
gulp.task('images', function () {
    return gulp.src('./lib/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./lib/img'));
});


//Our lite server
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "gis.whatup",
        notify: false
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


/******************** Take care of smart deployment ********************************/
gulp.task('deploy', function() {
  return gulp.src(['*/**'])
    .pipe(rsync({
        root: '/',
        hostname: '',
        username: '',
        destination: '/home/staylive/play.staylive.se/public_html/',
        incremental: true,
        exclude: []
    }));
});



// Watch scss AND php files, doing different things with each.
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['css']);
    gulp.watch(["**/*.html", "**/*.php"], ['bs-reload']);
});