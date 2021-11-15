var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// index.ts
import { dirname, relative, resolve } from "path";
var require_postcss_resolve_urls = __commonJS({
  "index.ts"(exports, module) {
    var Processed = Symbol("processed");
    var RelativeURL = /(?<=url\((?!['"]?(?:data|https?):)).+(?=\))/;
    var postCssResolveUrls = (options = {}) => {
      return {
        postcssPlugin: "postcss-resolve-urls",
        Declaration(declaration) {
          const assetPath = declaration.value.match(RelativeURL)?.[0] || false;
          const isProcessed = declaration[Processed];
          if (assetPath && !isProcessed) {
            declaration.value = transform(declaration, assetPath);
            declaration[Processed] = true;
          }
        }
      };
    };
    var transform = (declaration, asset) => {
      let { start, input: { file, map } } = declaration.source;
      let consumer = map.consumer(), original = consumer.originalPositionFor(start).source, resolved = relative(dirname(file), resolve(dirname(original), asset.replace(/['"]/g, "")));
      return declaration.value.replace(asset, resolved);
    };
    module.exports = postCssResolveUrls;
  }
});
export default require_postcss_resolve_urls();
