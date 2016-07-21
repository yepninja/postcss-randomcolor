const postcss = require('postcss');
const randomColor = require('randomcolor');
const parseValue = require('postcss-value-parser');

module.exports = postcss.plugin('postcss-randomcolor', (opts = {}) => {

    opts.functionName = opts.functionName || 'randomColor';

    // Work with options here

    return css => {

        // Transform CSS AST here
        css.walkDecls(decl => {

            let parsedValue = parseValue(decl.value);

            decl.value = parsedValue.walk((node) => {

                if (node.value !== opts.functionName) return;

                let params = [];
                if (node.type === 'function') {
                    params = node.nodes
                        .filter(({ type }) => type === 'word')
                        .map(({ value }) => value);

                    node.type = 'word';
                }

                node.value = randomColor({
                    luminosity: params[0],
                    hue: params[1]
                });
            }).toString();

        });
    };
});
