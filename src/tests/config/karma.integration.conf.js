const baseConfig = require('./karma.base.conf');
const path = require('path');

module.exports = function (config) {
    baseConfig(config, {
        files: ['../integration/**/*.spec.ts'],
        coverageReporter: {
            dir: path.resolve(__dirname, '../../../../coverage/integration'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ],
        },
        tsConfig: '../config/tsconfig.integration.spec.json',
    });
};
