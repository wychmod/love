var gulp = require("gulp"),
    less = require("gulp-less"),
    jade = require("gulp-jade"),
    autoprefixer = require("gulp-autoprefixer"),
    cssmin = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin"),
    sourcemaps = require("gulp-sourcemaps"),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    imgmin = require("gulp-imagemin"),
    pngquant = require("gulp-pngquant"),
    rev = require("gulp-rev"),
    changed = require("gulp-changed"),
    cache = require("gulp-cache"),
    browsersync = require('browser-sync').create();

var config = {
    "browsersync_conf": {
        files: [
            'jade/*.jade',
            '*.html',
            // 'css/*.css'
        ],
        server: {
            baseDir: "./"
        }
    },
    "autoprefixer_conf": ["chrome 30", "Firefox < 20", "ios_saf 8", "safari 8", 'Android >= 2.3', 'IE 9', 'IE 10'],
    "htmlmin_conf": {
        removeComments: true, //清除HTML注释
        collapseWhitespace: false, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    }
};

//autoprefixer
gulp.task('autofx', function() {
    gulp.src("css/*.css")
        .pipe(autoprefixer({
            browsers: config["autoprefixer_conf"], //不同浏览器的版本号，数组；
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('css'));
});

//jade
gulp.task('jade', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

//watch
gulp.task('autowatch', function() {
    // gulp.watch("less/*.less", ['less']); //当所有less文件发生改变时，调用less任务
    gulp.watch('jade/*.jade', ['jade']);
    // gulp.watch('es6js/*.js', ['babel']);
});

//task list
// gulp.task("build", ['autowatch', 'browsersync']);
gulp.task("autowatch-jade", ['autowatch']);
