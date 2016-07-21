import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.regex(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('uses randomColor in color prop', t => {
    return run(
                t,
                'a{color: randomColor}',
                /a{color: #[0-9a-f]{6}}/, { }
            );
});

test('uses randomColor in border prop', t => {
    return run(
                t,
                'a{border: 1px solid randomColor}',
                /a{border: 1px solid #[0-9a-f]{6}}/,
                { }
            );
});

test('uses randomColor function without params', t => {
    return run(
                t,
                'a{color: randomColor()}',
                /a{color: #[0-9a-f]{6}}/, { }
            );
});

test('uses randomColor function with params (luminosity and hue)', t => {
    return run(
                t,
                'a{color: randomColor(bright, green)}',
                /a{color: #[0-9a-f]{6}}/, { }
            );
});
