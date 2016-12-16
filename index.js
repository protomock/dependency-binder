var binder = require('./binder.js');
var autoBinder = require('./auto-binder.js');

module.exports = function(init) {
    global.binder = global.binder == null ? new binder() : global.binder;
    if (init) {
        global.binder.bindAll(init);
    }

    return new autoBinder();
};
