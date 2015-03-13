var assert = require('assert');

var node2angular = require('../index.js');

describe('index.js', function () {
    it('should produce output', function (cb) {
        node2angular('./test/testfile.js', {moduleName: 'my.app', serviceName: 'myModule'}, function (err, result) {
            assert.equal(err, null);
            assert.notEqual(result, null);

            cb();
        });
    });
});
