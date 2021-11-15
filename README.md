# postcss-resolve-urls

---

A [PostCSS](https://esbuild.github.io/) plugin for resolving relative URLs

> **IMPORTANT** This plugin depends on source maps

Given a directory structure like this
```
project/
├── images/
│   ├── logo.svg
└── css/
    ├── partials/
    │   └── partial.css
    ├── input.css
    └── output.css
```

```css
/** input.css */
@import './partials/partials.css';

/** partial.css */
section {
    background-image: url('../../images/logo.svg')
}

/** output.css */
section {
    background-image: url('../images/logo.svg')
}
```

## Install
`npm i -D postcss-resolve-urls`

## Usage

```js
import postCssResolveUrls from 'postcss-resolve-urls'

const output = postcss([
        postCssResolveUrls()
    ])
    .process(YOUR_INPUT_CSS);
```

If this PostCSS plugin helped you in any way please consider buying me a book @ my buymeacoffee.com page

[!["Buy Me A Coffee"][bmc-badge]][bmc-page]

### TODO:
- Include tests

[bmc-page]: https://www.buymeacoffee.com/bognarlaszlo
[bmc-badge]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg
