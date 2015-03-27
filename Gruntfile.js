// Generated on 2013-02-27 using generator-webapp 0.1.5
'use strict';
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        handlebars: {
            compile: {
                files: {
                    "<%= yeoman.app %>/edit/compiled-templates.js": ["<%= yeoman.app %>/edit/**/templates/*.bars"],
                    "<%= yeoman.app %>/pmc/compiled-templates.js": ["<%= yeoman.app %>/pmc/**/templates/*.bars"]
                },
                options: {
                    namespace: 'JST',
                    processName: function(filename) {
                        console.log(filename);
                        return filename
                            .replace(/^app\//, '')
                            .replace(/\.bars$/, '')
                            .replace('edit/', '')
                            .replace('pmc/', '')
                            .replace('app/', '') // TODO: just make a regex once moving is complete
                            .replace('common/', '') // see above todo
                            .replace('templates/', '');
                    },
                    amd: true
                }
            }
        },

        less: {
            //support regular ??????
            compile: {
                // files: {
                //     "<%= yeoman.app %>/styles/edit.css": "<%= yeoman.app %>/styles/edit.less",
                //     "<%= yeoman.app %>/styles/bg-style.css": "<%= yeoman.app %>/styles/bg-style.less"
                // }
                expand: true,
                flatten: true,
                cwd: '<%= yeoman.app %>/edit/styles',
                src: '*.less',
                dest: '<%= yeoman.app %>/edit/styles',
                ext: '.css'
            },
            compile1: {
                expand: true,
                flatten: true,
                cwd: '<%= yeoman.app %>/piazza/styles',
                src: '*.less',
                dest: '<%= yeoman.app %>/piazza/styles',
                ext: '.css'
            },
            compile2: {
                expand: true,
                flatten: true,
                cwd: '<%= yeoman.app %>/pmc/styles',
                src: '*.less',
                dest: '<%= yeoman.app %>/pmc/styles',
                ext: '.css'
            },
            compile3: {
                expand: true,
                flatten: true,
                cwd: '<%= yeoman.app %>/components/converse',
                src: '*.less',
                dest: '<%= yeoman.app %>/components/converse',
                ext: '.css'
            }
        },

        replace: {
            compile: {
                src: ['<%= yeoman.dist %>/*.html'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: "window.isOptimized = false;",
                    to: "window.isOptimized = true;"
                }]
            }
        },
        // how to use????
        connect: {
            options: {
                port: 49406,
                livereload: 49407,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },

        watch: {
            handlebars: {
                files: [
                    "<%= yeoman.app %>/**/templates/*.bars"
                ],
                tasks: ['handlebars', 'livereload-start']
            },
            less: {
                files: [
                    "<%= yeoman.app %>/styles/**/*.less",
                    "<%= yeoman.app %>/**/styles/*.less",
                    "<%= yeoman.app %>/components/**/*.less"
                ],
                tasks: ['less']
            }
        },
        open: {
            //        	target: 'http://localhost:8888', // target url to open
            //        	appName: 'open', // name of the app that opens, ie: open, start, xdg-open
            //        	callback: function() {} // called when the app has opened
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp',
            tmp: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        //添加多目录
        requirejs: {
            dist1: {
                options: {
                    baseUrl: '<%= yeoman.app %>/pmc',
                    optimize: 'none',
                    mainConfigFile: '<%= yeoman.app %>/pmc/main.js', //require 配置文件路径
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);
                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }
                        done();
                    },
                    out: '<%= yeoman.dist %>/pmc/amd-app.js'
                }
            },
            dist2: {
                options: {
                    baseUrl: '<%= yeoman.app %>/edit',
                    optimize: 'none',
                    mainConfigFile: '<%= yeoman.app %>/edit/main.js',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);
                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }
                        done();
                    },
                    out: '<%= yeoman.dist %>/edit/amd-app.js'
                }
            }
        },
        useminPrepare: {
            src: ['<%= yeoman.app %>/edit.html', '<%= yeoman.app %>/pmc.html', '<%= yeoman.app %>/piazza.html'],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/**/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '**/styles/{,*/}*.{png,jpg,jpeg}', // Optimize the img directory all PNG/JPG/jpeg images
                    dest: '<%= yeoman.dist %>'
                },{//audiojs styles img use at edit
                    expand: true,
                    cwd: '<%= yeoman.app %>/components/audiojs/circle.skin/img',
                    src: '*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/edit/styles/img'
                },{ //jquery ui styles img use at edit
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts/libs/jqueryui/img',
                    src: '*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/edit/styles/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/edit/styles/main.css': ['<%= yeoman.dist %>/edit/styles/main.css', '.tmp/built.css'], //只在edit中采用require依赖css方式， 否则临时built.css文件会包含多个模块css
                    '<%= yeoman.dist %>/pmc/styles/main.css': ['<%= yeoman.dist %>/pmc/styles/main.css'],
                    '<%= yeoman.dist %>/piazza/styles/main.css': ['<%= yeoman.app %>/piazza/styles/main.css'],
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            // '.htaccess',
                            // 'empty.html',
                            // '**/index.html',
                            // 'preview_export/**',
                            // 'zip/**',
                            // 'slide_admin_module/**',
                            // 'piazza/**',
                            // 'reveal/**',
                            '**/fonts/**',
                            'scripts/libs/jQuery.js',
                            // 'scripts/libs/require.js'
                        ]
                    // }, {
                    //     expand: true,
                    //     dot: true,
                    //     flatten: true,
                    //     cwd: '<%= yeoman.app %>',
                    //     dest: '<%= yeoman.dist %>/styles/edit/img',
                    //     src: [
                    //         'styles/edit/**/*.{ico,txt,png,jpg,gif,svg}',
                    //         'components/**/*.{ico,txt,png,jpg,gif,svg}',
                    //     ]
                    // }, {
                    //     expand: true,
                    //     dot: true,
                    //     flatten: true,
                    //     cwd: '<%= yeoman.app %>/styles/pmc/img',
                    //     dest: '<%= yeoman.dist %>/styles/pmc/img',
                    //     src: [
                    //         '**/*.{ico,txt,png,jpg,gif,svg}',
                    //     ]
                    // }, {
                    //     expand: true,
                    //     dot: true,
                    //     cwd: '<%= yeoman.app %>/styles',
                    //     dest: '<%= yeoman.dist %>/styles',
                    //     src: [
                    //         'piazza/**/*.{ico,txt,png,jpg,gif,svg,css}',
                    //         'admin/**/*.{ico,txt,png,jpg,gif,svg,css}',
                    //     ]
                    // }, {
                    //     expand: true,
                    //     dot: true,
                    //     flatten: true,
                    //     cwd: '<%= yeoman.app %>/styles/img',
                    //     dest: '<%= yeoman.dist %>/styles/img',
                    //     src: [
                    //         '**/*.{ico,txt,png,jpg,gif,svg}',
                    //     ]
                    // },
                    // // TODO: figure out what the deal is with the fonts in dist mode...
                    // {
                    //     expand: true,
                    //     dot: true,
                    //     flatten: true,
                    //     cwd: '<%= yeoman.app %>',
                    //     dest: '<%= yeoman.dist %>',
                    //     src: [
                    //         '**/*.woff'
                    //     ]
                    // }, {
                    //     expand: true,
                    //     cwd: '<%= yeoman.app %>/styles/strut.themes',
                    //     dest: '<%= yeoman.dist %>/styles/strut.themes',
                    //     src: [
                    //         '**/*.png',
                    //         '*.css'
                    //     ]
                    }
                ]
            }
        },
        bower: {
            all: {
                // rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        }
    });

    grunt.registerTask('start', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            // 'clean:server',
            'handlebars',
            'less',
            'watch'
        ]);
    });

    grunt.registerTask('develop', [
        'connect:dist:keepalive'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'handlebars',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'replace',
        'usemin',
        'clean:tmp'
    ]);

    grunt.registerTask('default', [
        // 'jshint',
        'less',
        'watch',
        // 'test',
        // 'build'
    ]);
};