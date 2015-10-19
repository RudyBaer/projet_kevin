module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.initConfig({

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        concat: {
            js: {
                src: ['html/index.js', 'html/service.js', 'html/controller.js', 'html/directive/**/*.js'],
                dest: 'html/all.js',
            }
        },
    });


    grunt.registerTask('default', ['test']);

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('build', ['concat:js']);
}