module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            front: {
                options: {
                    yuicompress: true,
                },
                files: {
                    "public/asset/css/main.min.css": [
                        'css/main.less',
                        'bower_components/normalize-css/normalize.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                yuicompress: false,
            },
            dist: {
                files: {
                    'public/asset/js/main.min.js': [
                        'js/onDomReady.js',
                        'js/classie.js',
                        'js/home.js'
                    ]
                }
            }
        },
        watch: {
            css: {
                files: 'css/*.less',
                tasks: ['less:front']
            },
            js: {
                files: 'js/*.js',
                tasks: ['uglify:dist']
            }
        },
        connect: {
            yng: {
                options: {
                    ports: 8000,
                    base: "."
                }
            }
        },
        /*experiments*/
        /*imgagemin: {
            dynamic : {
                files:
                    //'public/asset/img': ['img/*.{gif,jpg,png}']
                    {
                        'public/asset/img/build/bg.jpg':'public/asset/img/bg.jpg'
                    }
            }
        },*/
        browser_sync: {
            files: {
                src : 'public/asset/style.css'
            }
        }
    });




    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('site','connect:yng:keepalive');
    grunt.registerTask('default', ['less','uglify']);

    grunt.registerTask('experiments',['browser_sync']);

};
