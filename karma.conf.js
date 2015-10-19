module.exports = function (config) {
    config.set({

        basePath: 'html/',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'index.js',
            'service.js',
            'controller.js',
            'controllerSpec.js'
        ],

        autoWatch: true,
        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ]
    });
};