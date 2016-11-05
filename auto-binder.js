function autoBinder() {
    this.directoryGrapher = require('./directory-grapher.js');
}

autoBinder.prototype = {
    autowire: function(root, src) {
        var packageGraph = this.directoryGrapher.createPackageGraph(root, src);
        src = !/\/$/.test(src) ? src + '/' : src;
        src = src.replace('.', root);
        var graph = this.directoryGrapher.createSrcGraph(src, packageGraph);
        binder.softBindAll(graph);
    }
}
module.exports = autoBinder;
