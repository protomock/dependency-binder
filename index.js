var binder = require('./binder.js');

module.exports = function(init) {
    global.binder = global.binder == null ? new binder() : global.binder;
    global.binder.bindAll(init);
};
