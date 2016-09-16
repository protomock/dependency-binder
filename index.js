var binder = require('./binder.js');

module.exports = (config) => {
    return new binder().init(config);
};
