import {dirname, relative, resolve} from 'path';

const Processed = Symbol('processed');
const RelativeURL = /(?<=url\((?!['"]?(?:data|https?):)).+?(?=\))/g;

const postCssResolveUrls = (options = {debug: false}) => {
    return {
        postcssPlugin: 'postcss-resolve-urls',
        Declaration(declaration)
        {
            if (! declaration[Processed] && RelativeURL.test(declaration.value))
            {
                declaration.value = declaration.value.replaceAll(RelativeURL, (url) => transform(declaration, url))
                declaration[Processed] = true
            }
        }
    }
}

const transform = (declaration, url) => {
    let {start, input: {file, map}} = declaration.source;

    let consumer = map.consumer(),
        original = consumer.originalPositionFor(start).source,
        resolved = relative(
            dirname(file),
            resolve(dirname(original), url.replace(/['"]/g, ''))
        );

    return resolved.replaceAll('\\', '\/')
}

export = postCssResolveUrls
