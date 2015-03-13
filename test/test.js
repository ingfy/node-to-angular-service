var assert = require('assert');

var node2angular = require('../index.js');

describe('index.js', function () {
    it('should produce output', function () {
        node2angular({file: './test/testfile.js', moduleName: 'my.app', serviceName: 'myModule'}, function (err, result) {
            assert.equal(err, null);
            assert.notEqual(result, null);

            done();
        });


    });

    it('should read contents', function () {
        var fs = require('fs');
        var contents = fs.readFileSync('./test/testfile.js');
        node2angular({contents: contents, moduleName: 'my.app', serviceName: 'myModule'}, function (err, result) {
            assert.equal(err, null);
            assert.notEqual(result, null);

            done();
        });
    });
});
