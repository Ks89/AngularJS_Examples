/**
 * Created by Stefano Cappa on 27/08/15.
 */

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://localhost:8000',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['*Spec*.js'],

    jasmineNodeOpts: {
        showColors: true
    }
};