module.exports = {
    resolveModule: function(value) {
        try {
            var actual = this.resolvePath(value, __dirname);
            console.log(actual);
            return require(actual);
        } catch (e) {
            console.warn(e.message);
            return value;
        }
    },
    resolvePath: function(filePath, currentContext) {
        var slice = "";
        if (filePath.indexOf('./') > -1) {
            if (currentContext.indexOf('node_modules') > -1) {
                slice = currentContext.substring(0, currentContext.indexOf('node_modules'));
            }
            if (currentContext.indexOf('submodules') > -1) {
                slice = currentContext.substring(0, currentContext.indexOf('submodules'));
            }
        }
        return slice != "" ? filePath.replace('./', slice) : filePath;
    }
}
