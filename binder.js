function binder() {
    this.bound = {};
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
            try {
                this.bound[key] = require(value);
            } catch (e) {
                console.warn(e.message);
            }
        } else {
            this.bound[key] = value;
        }
    },
    resolve: function(key) {
        return this.bound[key];
    }
};


module.exports = binder;
