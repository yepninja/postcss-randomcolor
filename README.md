# PostCSS Randomcolor [![Build Status][ci-img]][ci]

[PostCSS] plugin supports function to use random colors.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/alanev/postcss-randomcolor.svg
[ci]:      https://travis-ci.org/alanev/postcss-randomcolor

```css
:root{
    --red: randomColor(random, red);
}
.foo {
  border-color: randomColor;
  background: randomColor(light);
  color: randomColor(dark, blue);
}
```

```css
:root{
    --red: #d65755;
}
.foo {
  border-color: #5dd8b9;
  background: #d5c9ff;
  color: #090070;
}
```

## Options of randomColor function

### luminosity
Luminosity of the color<br>
Type: `string` -> `random`, `bright`, `light`, `dark`<br>
Default: `random`

```css
.foo {
    color: randomColor(bright);
}
```

### hue
Hue of the color<br>
Type: `string` -> `random`, `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `monochrome`<br>
Default: `random`

```css
.foo {
    color: randomColor(random, orange);
}

## Usage

```js
postcss([ require('postcss-randomcolor')(options) ])
```

See [PostCSS] docs for examples for your environment.

## Plugin options

### options.functionName
Name of the function that insert random color<br>
Type: `string`<br>
Default: `randomColor`

```js
postcss([ require('postcss-randomcolor')({functionName: 'random-color'}) ])
```
```css
.foo {
    color: random-color;
}
```

### options.format
Format of the color<br>
Type: `string` -> `hex`, `hsl`, `rgb`<br>
Default: `hex`
