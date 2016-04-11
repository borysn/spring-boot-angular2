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
    del([staticDir + 'js/lib/*'], {force: true}).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });

    gulp.src([
            // copy angular dependencies
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/angular2-polyfills.js',
            './node_modules/angular2/bundles/http.dev.js',
            './node_modules/angular2/bundles/router.dev.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/systemjs/dist/system-polyfills.js',
            './node_modules/rxjs/bundles/Rx.js',

            // copy jasmine-core dependencies
            './node_modules/jasmine-core/lib/jasmine-core/jasmine.css',
            './node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
            './node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
            './node_modules/jasmine-core/lib/jasmine-core/boot.js'
    ])
        .pipe(gulp.dest(staticDir + 'js/lib'));
})

// html copy
gulp.task('htmlcopy', function() {
    // clean dest
    del([staticDir + 'index.html',
         staticDir + 'jasmine/**/*.html',
         staticDir + 'app/**/*.html'], {force:true})
         .then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });

    // copy index
    gulp.src('./index.html')
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
    // watch index
    gulp.watch('./index.html', ['htmlcopy']);

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
gulp.task('build', ['libcopy', 'htmlcopy', 'sass', 'tsc']);

// watch sass, ts, and html
gulp.task('watch', ['sassw', 'htmlw', 'tscw']);

// default
gulp.task('default', ['build']);
