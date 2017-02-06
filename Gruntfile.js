/**
 * @Author: St. <SuperWoods>
 * @Date:   2017-01-14-11:34:26
 * @Email:  st_sister@iCloud.com
 * @Filename: Gruntfile.js
* @Last modified by:   SuperMoo
* @Last modified time: 2017-02-06-13:50:32
 * @License: MIT
 */

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // 显示解析时间
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * Copyright (c) 2000 - <%= grunt.template.today("yyyy") %> SuperMoo <st_sister@me.com>.\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
            ' */\n',
        //css文件合并
        concat: {
            options: {
                //all 不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                // preserveComments: 'false',
                banner: '<%= banner %>',
                stripBanners: true
            },
            cssAddBanner: {
                files: [{
                    expand: true,
                    cwd: 'bundle/',
                    src: ['*.css'],
                    dest: 'bundle/',
                }]
            },
        },
        cssmin: {
            execute: {
                files: {
                    'bundle/index.min.css': ['bundle/index.autoprefixer.css'],
                }
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            execute: {
                files: {
                    'bundle/index.min.js': ['bundle/index.min.js'],
                }
            },
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version'],
                // browsers: ['> 5%', 'last 2 versions', 'Firefox >= 20', 'last 4 Explorer versions', ],
                // browsers: ['> 5%', 'last 4 versions', 'Firefox >= 20', 'last 4 Explorer versions', , 'last 4 Opera versions'],
                cascade: true,
                remove: true,
            },
            execute: {
                files: {
                    'bundle/index.autoprefixer.css': ['bundle/index.min.css']
                }
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // default
    grunt.registerTask('default', [
        'uglify:execute', // uglify
        'autoprefixer:execute',
        'cssmin', // css: cssmin
        'concat:cssAddBanner', // cssAddBanner
    ]);

};
