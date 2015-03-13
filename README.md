# Node module for injecting a node module into an angular service

### Example 1
    var node2angular = require('node-to-angular-service'),
        fs = require('fs');

    node2angular('mymodule.js', {moduleName: 'my.app', serviceName: 'myModule'}, function (err, result) {
        if (!err) {
            fs.writeFileSync('my-angular-service.js', result);
        }
    });
