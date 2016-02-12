// Gruntfile.js
module.exports = function(grunt) {
	// require
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	// grunt config
	grunt.initConfig({
		// pkg
		pkg: grunt.file.readJSON('package.json'),

		// TODO using bootstrap sass?
		// project settings
		project: {
			webappdir: '../resources/static',

			// sass to css
			sass: {
				cwd: 'scss',
				src: '**/*.scss',
				dest: '<%= project.webappdir %>/css',
				ext: '.css'
			}

		},

		// grunt-contrib-clean
		clean: {
			dist: {
				src: [ '<%= project.webappdir %>/*']
			},

			options: {
				// enable clean outside of current working dir
				force: true
			}
		},

		// grunt-contrib-copy
		copy: {
			// copy dev files
			dev: {
				files: [
					// angular2 dependencies
					{
						nonull: true,
						expand: true,
						flatten: true,
						cwd: 'node_modules',
						src: ['/angular2/bundles/angular2.dev.js',
						      '/angular2/bundles/angular2-polyfills.js',
	  						  '/angular2/bundles/http.dev.js',
						      '/systemjs/dist/system.src.js',
							  '/systemjs/dist/system-polyfills.js',
						      '/rxjs/bundles/Rx.js',
						      '/es6-shim/es6-shim.min.js'],
						dest: 'js/lib/'
					}]
			},

			// dist copy, copy necessary files for distribution
			dist: {
				files: [
					// copy webworkdir to webapp excluding scss
					// (sass build/copy is part of a seperate task)
					{
						expand: true,
						cwd: './',
						src: [ './index.html',
							   './js/lib/**'],
						dest: '<%= project.webappdir %>'
					}]
			},

			options: {
				// enable clean outside of current working dir
				force: true
			}
		},

		// grunt-contrib-sass
		sass: {
			dist: {
				files: [ {
					expand: true, // recursive
					cwd: '<%= project.sass.cwd %>', // startup dir
					src: [ '<%= project.sass.src %>' ], // source files
					dest: '<%= project.sass.dest %>', // destination
					ext: '<%= project.sass.ext %>' // final extension
				} ]
			},
			options: {
				style: 'compressed'
			}
		},

		// grunt-autoprefixer
		autoprefixer: {
			files: {
				src: [ '<%= project.sass.dest %>/**/*.css' ]
			},
			options: {
				browsers: [ 'last 3 versions' ]
			}
		},

		// grunt-contrib-watch
		watch: {
			js: {
				files: [ 'js/**/*.js',
			             'app/**/*.ts',
					     'index.html',
					     'Gruntfile.js',
					     'tsconfig.json',
					     'tslint.json',
					     'scss/**/*.scss',
					     '!js/lib/**' ],
				tasks: [ 'build' ],
				options: {
					interrupt: true
				}
			}
		},

		// grunt-bowercopy
		bowercopy: {
			options: {
				destPrefix: '<%= project.webappdir %>'
			    //clean: true
			}
		},

		// typescript config
		ts: {
			dev: {
				src: ['app/**/*.ts', '!typings/main/**', '!typings/main.d.ts'],
				dest: '<%= project.webappdir %>/app/',
				tsconfig: 'tsconfig.json'
			}
		}

	});

	// load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-ts');

	// custom tasks
	grunt.registerTask('build', ['clean', 'bowercopy', 'copy', 'sass', 'autoprefixer', 'ts']);
	grunt.registerTask('dev', ['watch']);

	// default
	grunt.registerTask('default', ['build']);
};
