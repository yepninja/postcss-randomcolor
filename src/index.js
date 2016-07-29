const postcss = require('postcss');
const randomColor = require('randomcolor');
const parseValue = require('postcss-value-parser');

module.exports = postcss.plugin('postcss-randomcolor', (opts = {}) => {

    opts.functionName = opts.functionName || 'randomColor';

    return css => {

        css.walkDecls(decl => {

            let parsedValue = parseValue(decl.value);

            decl.value = parsedValue.walk((node) => {

                if (node.value !== opts.functionName) return;

                let params = [],
                    options = {};
                if (node.type === 'function') {
                    params = node.nodes
                        .filter(({ type }) => type === 'word')
                        .map(({ value }) => value);

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
