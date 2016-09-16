var binder = require('./binder.js');

module.exports = (init) => {
    return new binder().bindAll(init);
};
