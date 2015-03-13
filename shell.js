angular.module(/* inject: moduleName */, [])
.factory(/* inject: serviceName */, function () {
    var module = {exports: {}};

    (function () {
        /* inject: file */
    }());

    return module.exports;
});
