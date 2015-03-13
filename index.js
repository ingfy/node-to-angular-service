'use strict';

var path = require('path'),
    fs = require('fs');

module.exports = function (file, opt, cb) {
    if (!file) {
        throw Error('Missing file: node-to-angular-service');
    }

    opt = opt || {};

    var fileName;

    if (typeof file === 'string') {
        fileName = file;
    } else if (typeof file.path === 'string') {
        fileName = path.basename(file.path);
    }

    if (!opt.moduleName) opt.moduleName = fileName;
    if (!opt.serviecName) opt.serviceName = fileName;

    var shell = opt.shellFile || './shell.js';

    fs.readFile(shell, opt.shellEncoding || 'utf8', function (err, shellContents) {
        if (err) cb(err);

        fs.readFile(file, opt.encoding || 'utf8', function (err, contents) {
            if (err) cb(err);

            var result = shellContents
                .replace('/* inject: moduleName */', '\'' + opt.moduleName + '\'')
                .replace('/* inject: serviceName */', '\'' + opt.serviceName + '\'')
                .replace('/* inject: file */', contents);

            cb(null, result);

        });

    });
};
