const NODE_MODULES = 'node_modules';
const SUBMODULES = 'submodules';

module.exports = {
    resolveModule: function(value) {
        try {
            var actual = this.resolvePath(value, __dirname);
            return require(actual);
        } catch (e) {
            console.warn(e.message);
            return value;
        }
    },
    resolvePath: function(filePath, currentContext) {
        var slice = "";
        if (filePath.indexOf('./') > -1) {
            if (currentContext.indexOf(NODE_MODULES) > -1) {
                slice = this.resolveFolderContext(NODE_MODULES, currentContext);
            }
            if (currentContext.indexOf(SUBMODULES) > -1) {
                slice = this.resolveFolderContext(SUBMODULES, currentContext);
            }
        }
        return slice != "" ? filePath.replace('./', slice) : filePath;
    },

    resolveFolderContext: function(folder, path) {
        var pathArray = path.split('/');
        var lastIndex = pathArray.lastIndexOf(folder);
        return pathArray.slice(0, lastIndex).join('/') + '/';
    },
}
