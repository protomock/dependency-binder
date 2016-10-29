if (process.argv[2] != '-n') {
    require('../index.js')({
        "controller": "./integration/src/controller.js"
    });
} else {
    require('../index.js')().autowire(__dirname, './src');
}

module.exports = {
    start: function() {
        if (process.argv[2] == '-s' || process.argv[3] == '-s') {
            var controller = binder.resolve('controller');
            return controller.controlSomething();
        }
    }
}

module.exports.start();
