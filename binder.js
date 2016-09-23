function binder() {
    this.bound = {};
    this.resolver = require('./resolver');
}

binder.prototype = {
    constuctor: binder,
    bindAll: function(json) {
        for (var key in json)
            this.bind(key, json[key]);
        return this;
    },
    bind: function(key, value) {
        if (typeof value == 'string') {
            this.bound[key] = this.resolver.resolveModule(value);
        } else {
            this.bound[key] = value;
        }
    },
    resolve: function(key) {
        return this.bound[key];
    }
};


module.exports = binder;
