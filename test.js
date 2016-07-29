import postcss from 'postcss';
import test    from 'ava';

import plugin from './lib/';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.regex(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('uses randomColor keyword in color prop', t => {
    return run(
        t,
        'a{color: randomColor}',
        /a{color: #[0-9a-f]{6}}/,
        { }
    );
});

test('uses randomColor keyword in border prop', t => {
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
        /a{color: #[0-9a-f]{6}}/,
        { }
    );
});

test('uses randomColor function with params (luminosity and hue)', t => {
    return run(
        t,
        'a{color: randomColor(bright, green)}',
        /a{color: #[0-9a-f]{6}}/,
        { }
    );
});

test('uses randomColor as variable', t => {
    return run(
        t,
        '$color: randomColor(dark)',
        /\$color: #[0-9a-f]{6}/,
        { }
    );
});

test('uses randomColor keyword in function', t => {
    return run(
        t,
        'a{color: color(randomColor a(.5))}',
        /\a{color: color\(#[0-9a-f]{6} a\(\.5\)\)}/,
        { }
    );
});

test('uses randomColor function in function', t => {
    return run(
        t,
        'a{color: color(randomColor(dark, red) a(.5))}',
        /\a{color: color\(#[0-9a-f]{6} a\(\.5\)\)}/,
        { }
    );
});

test('uses randomColor with another keyword', t => {
    return run(
        t,
        'a{color: random-color}',
        /a{color: #[0-9a-f]{6}}/,
        {
            functionName: 'random-color'
        }
    );
});

test('uses randomColor with rgb format', t => {
    return run(
                t,
        'a{color: randomColor}',
        /a{color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)}/,
        {
            format: 'rgb'
        }
    );
});

test('uses randomColor with hsl format', t => {
    return run(
        t,
        'a{color: randomColor}',
        /a{color: hsl\(\d{1,3}, (?:\d*\.)?\d+%, (?:\d*\.)?\d+%\)/,
        {
            format: 'hsl'
        }
    );
});
