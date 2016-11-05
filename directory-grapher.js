module.exports = {
    fs: require('fs'),
    requireProvider: require('./require-provider.js'),
    junk: require('junk'),
    createPackageGraph: function(root, src) {
        var graph = {};
        var packagesPath = root + "/package.json";
        var packages = JSON.parse(this.fs.readFileSync(packagesPath));
        for (key in packages.dependencies) {
            if (key != 'dependency-binder') {
                graph[key] = require(key);
                console.log("added: " + key);
            }
        }
        return graph;
    },
    createSrcGraph: function(srcDir, graph) {
        var fs = this.fs,
            contents = fs.readdirSync(srcDir),
            self = this;

        contents.forEach(function(file) {
            var path = srcDir + file;
            if (fs.statSync(path).isDirectory()) {
                graph = self.createSrcGraph(path + '/', graph);
            } else {
                if (self.junk.not(file)) {
                    file = file.replace('.js', '');
                    graph[file] = self.requireProvider.provide(path);
                    console.log("added: " + file + " at path: " + path);
                }
            }
        });
        return graph;
    }
}
