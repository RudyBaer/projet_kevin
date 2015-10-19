exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'html/scenarios.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000',

    framework: 'jasmine2',


    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};