function binder() {
    this.bound = {};
}

binder.prototype = {
    constuctor: binder,
    init: function(json) {
        for (var key in json)
            this.bind(key, json[key]);
        return this;
    },
    bind: function(key, value) {
        this.bound[key] = value;
    },
    resolve: function(key) {
        return this.bound[key];
    }
};

module.exports = binder;
