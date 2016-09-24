var binder = require('./binder.js');

module.exports = (init) => {
    global.binder = global.binder == null ? new binder().bindAll(init) : global.binder;
};
