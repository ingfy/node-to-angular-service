'use strict';

var path = require('path'),
    fs = require('fs');

function Replacer(string) {
    this.string = string;
}

Replacer.prototype.replace = function (match, replaceWith) {
    var parts = this.string.split(match);

    if (parts.length < 2) throw Error('' + match + ' not found in ' + this.string);
    if (parts.length > 2) throw Error('more than one ' + match + ' found in ' + this.string);

    var result = parts[0] + replaceWith + parts[1];

    return new Replacer(result);
}

Replacer.prototype.toString = function () { return this.string; }

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

    var shell = opt.shellFile || path.join(__dirname, 'shell.js');



    fs.readFile(shell, opt.shellEncoding || 'utf8', function (err, shellContents) {
        if (err) cb(err);

        function process(contents) {
            var result = new Replacer(shellContents)
                .replace('/* inject: moduleName */', '\'' + opt.moduleName + '\'')
                .replace('/* inject: serviceName */', '\'' + opt.serviceName + '\'')
                .replace('/* inject: file */', contents)
                .toString();

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
