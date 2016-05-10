'use strict';

// require
var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json',
    {typescript: require('typescript')});
var del = require('del');

// vars
var staticDir = '../resources/static/';

// lib copy
gulp.task('libcopy', function() {
    // clean dest
    del([staticDir + 'js/lib/*',
         staticDir + 'css/lib/*'], {force: true})
       .then(paths => {
         console.log('Deleted files and folders:\n', paths.join('\n'));
    });

    // copy @angular, angular2-in-memory-web-api, and rxjs
    gulp.src(['./node_modules/@angular/**/*'])
        .pipe(gulp.dest(staticDir + 'js/lib/@angular'));
    gulp.src(['./node_modules/angular2-in-memory-web-api/**/*'])
        .pipe(gulp.dest(staticDir + 'js/lib/angular2-in-memory-web-api'));
    gulp.src(['./node_modules/rxjs/**/*'])
        .pipe(gulp.dest(staticDir + 'js/lib/rxjs'));

    // copy @angular dependencies
    gulp.src(['./node_modules/zone.js/dist/zone.js',
              './node_modules/reflect-metadata/Reflect.js',
              './node_modules/systemjs/dist/system.src.js'])
        .pipe(gulp.dest(staticDir + 'js/lib'));

    // copy jasmine-core dependencies
    gulp.src(['./node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
              './node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
              './node_modules/jasmine-core/lib/jasmine-core/boot.js'])
        .pipe(gulp.dest(staticDir + 'js/lib'));
    gulp.src(['./node_modules/jasmine-core/lib/jasmine-core/jasmine.css'])
        .pipe(gulp.dest(staticDir + 'css/lib'));
})

// html/config copy
gulp.task('htmlcopy', function() {
    // clean dest
    del([staticDir + 'index.html',
         staticDir + 'systemjs.config.js',
         staticDir + 'jasmine/**/*.html',
         staticDir + 'app/**/*.html'], {force:true})
         .then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });

    // copy index && systemjs cofnig
    gulp.src(['./index.html', './systemjs.config.js'])
        .pipe(gulp.dest(staticDir));

    // copy unit-test html
    gulp.src('./jasmine/**/*.html')
        .pipe(gulp.dest(staticDir + 'jasmine'));

    // copy angular templates
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest(staticDir + 'app'));
});

// html watch
gulp.task('htmlw', function() {
    // watch index && systemjs config
    gulp.watch(['./index.html', 'systemjs.config.js'], ['htmlcopy']);

    // watch angular templates
    gulp.watch('./app/**/*.html', ['htmlcopy']);

    // watch tests for changes
    gulp.watch('./jasmine/**/*.html', ['htmlcopy']);
});

// sass compile
gulp.task('sass', function() {
    // clean dest
    del([staticDir + 'css/*'], {force: true}).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });

    // compile sass and copy
    return gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(staticDir + 'css'));
});

// sass watch compile
gulp.task('sassw', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// typescript compile
gulp.task('tsc', function() {
    // clean src dest
    del([staticDir + 'app/**/*.js'], {force: true}).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });

    // clean test dest
    del([staticDir + 'jasmine/**/*.js'], {force: true}).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });

    // compile typescript
    var tsResult = tsProject.src().pipe(ts(tsProject));

    // copy
	return tsResult.js.pipe(gulp.dest(staticDir));
});

// typescript watch compile
gulp.task('tscw', function() {
    gulp.watch(['./app/**/*.ts',
                './app/**/*.html',
                './jasmine/**/*.ts'],
                ['htmlcopy', 'tsc']);
});

// build sass and ts, copy libs, copy html
gulp.task('build', ['htmlcopy', 'sass', 'tsc', 'libcopy']);

// watch sass, ts, and html
gulp.task('watch', ['build', 'sassw', 'htmlw', 'tscw']);

// default
gulp.task('default', ['build']);
