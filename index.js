'use strict';

var path = require('path'),
    fs = require('fs');

module.exports = function (opt, cb) {
    if (!opt.file && (!opt.contents && opt.contents !== '')) {
        throw Error('Missing file: node-to-angular-service');
    }

    opt = opt || {};

    if (opt.file) {
        var fileName;

        if (typeof opt.file === 'string') {
            fileName = opt.file;
        } else if (typeof opt.file.path === 'string') {
            fileName = path.basename(opt.file.path);
        }

        if (!opt.moduleName) opt.moduleName = fileName;
        if (!opt.serviecName) opt.serviceName = fileName;
    }

    var shell = opt.shellFile || './shell.js';



    fs.readFile(shell, opt.shellEncoding || 'utf8', function (err, shellContents) {
        if (err) cb(err);

        function process(contents) {
            var result = shellContents
                .replace('/* inject: moduleName */', '\'' + opt.moduleName + '\'')
                .replace('/* inject: serviceName */', '\'' + opt.serviceName + '\'')
                .replace('/* inject: file */', contents);

            cb(null, result);
        }

        if (opt.contents) {
            process(opt.contents);
        } else {
            fs.readFile(opt.file, opt.encoding || 'utf8', function (err, contents) {
                if (err) cb(err);

                process(contents);

            });
        }
    });
};
