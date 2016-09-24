var binder = require('./binder.js');

module.exports = (init) => {
    global.binder = global.binder == null ? new binder() : global.binder;
    global.binder.bindAll(init);
};
