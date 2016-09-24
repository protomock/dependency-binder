function binder() {
    this.objectGraph = {};
    this.resolver = require('./resolver');
}

binder.prototype = {
    constructor: binder,
    bindAll: function(json) {
        for (var key in json)
            this.bind(key, json[key]);
        return this;
    },
    bind: function(key, value) {
        if (typeof value == 'string') {
            this.objectGraph[key] = this.resolver.resolveModule(value);
            console.log("added: " + this.objectGraph[key]);
        } else {
            this.objectGraph[key] = value;
        }
    },
    resolve: function(key) {
        return this.objectGraph[key];
    }
};


module.exports = binder;
