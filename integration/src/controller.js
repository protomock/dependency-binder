module.exports = {
    controlSomething: function() {
        var client = binder.resolve('client');
        var dataaccess = binder.resolve('dataaccess');
        return client.getSomething();
    }
}
