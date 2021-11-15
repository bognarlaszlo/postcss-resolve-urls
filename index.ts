import {dirname, relative, resolve} from 'path';

const Processed = Symbol('processed');
const RelativeURL = /(?<=url\((?!['"]?(?:data|https?):)).+(?=\))/;

const postCssResolveUrls = (options = {}) => {
    return {
        postcssPlugin: 'postcss-resolve-urls',
        Declaration(declaration)
        {
            const assetPath = declaration.value.match(RelativeURL)?.[0] || false
            const isProcessed = declaration[Processed]

            if (assetPath && !isProcessed)
            {
                declaration.value = transform(declaration, assetPath)
                declaration[Processed] = true;
            }
        }
    }
}

const transform = (declaration, asset) => {
    let {start, input: {file, map}} = declaration.source;

    let consumer = map.consumer(),
        original = consumer.originalPositionFor(start).source,
        resolved = relative(
            dirname(file),
            resolve(dirname(original), asset.replace(/['"]/g, ''))
        );

    return declaration.value.replace(asset, resolved)
}

export = postCssResolveUrls
