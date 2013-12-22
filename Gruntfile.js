module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        less :{
            front: {
                options: {
                    yuicompress:true,
                },
                files: {
                    "public/asset/css/main.min.css":[
                    'css/main.less',
                    'bower_components/normalize-css/normalize.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                yuicompress:true,
            },
            dist: {
                files: {
                    'public/asset/js/main.min.js': ['js/*.js']
                }
            }
        },
        watch: {
            css: {
                files:'css/*.less',
                tasks:['less:front']
            },
            js: {
                files:'js/*.js',
                tasks:['uglify:dist']
            }
        },
        connect: {
            yng:{
                options:{
                    ports:8000,
                    base:"."
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('site','connect:yng:keepalive');
    grunt.registerTask('default', ['less','uglify']);

};
