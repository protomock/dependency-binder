module.exports = {
    controlSomething: function() {
        var client = binder.resolve('client');
        return client.getSomething();
    }
}
