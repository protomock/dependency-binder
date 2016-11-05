function binder() {
    this.objectGraph = {};
    this.autowired = false;
    this.resolver = require('./resolver');
}

binder.prototype = {
    constructor: binder,
    bindAll: function(json) {
        for (var key in json)
            this.bind(key, json[key]);
        return this;
    },
    softBindAll: function(json) {
        for (var key in json) {
            this.softBind(key, json[key]);
        }
        return this;
    },
    bind: function(key, value) {
        if (typeof value == 'string') {
            this.objectGraph[key] = this.resolver.resolveModule(value);
        } else {
            this.objectGraph[key] = value;
        }
    },
    softBind: function(key, value) {
        if (!this.objectGraph[key]) {
            this.bind(key, value);
        }
    },
    resolve: function(key) {
        return this.objectGraph[key];
    },
    reset: function() {
        this.objectGraph = {};
    }
};


module.exports = binder;
