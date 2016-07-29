'use strict';

var postcss = require('postcss');
var randomColor = require('randomcolor');
var parseValue = require('postcss-value-parser');

module.exports = postcss.plugin('postcss-randomcolor', function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


    opts.functionName = opts.functionName || 'randomColor';

    return function (css) {

        css.walkDecls(function (decl) {

            var parsedValue = parseValue(decl.value);

            decl.value = parsedValue.walk(function (node) {

                if (node.value !== opts.functionName) return;

                var params = [],
                    options = {};
                if (node.type === 'function') {
                    params = node.nodes.filter(function (_ref) {
                        var type = _ref.type;
                        return type === 'word';
                    }).map(function (_ref2) {
                        var value = _ref2.value;
                        return value;
                    });

                    node.type = 'word';
                }

                if (params[0]) options.luminosity = params[0];
                if (params[1]) options.hue = params[1];
                if (opts.format) options.format = opts.format;

                node.value = randomColor(options);
            }).toString();
        });
    };
});