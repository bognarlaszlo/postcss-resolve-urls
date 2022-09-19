var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// index.ts
import { dirname, relative, resolve } from "path";
var require_postcss_resolve_urls = __commonJS({
  "index.ts"(exports, module) {
    var Processed = Symbol("processed");
    var RelativeURL = /(?<=url\((?!['"]?(?:data|https?):)).+?(?=\))/g;
    var postCssResolveUrls = (options = { debug: false }) => {
      return {
        postcssPlugin: "postcss-resolve-urls",
        Declaration(declaration) {
          if (!declaration[Processed] && RelativeURL.test(declaration.value)) {
            declaration.value = declaration.value.replaceAll(RelativeURL, (url) => transform(declaration, url));
            declaration[Processed] = true;
          }
        }
      };
    };
    var transform = (declaration, url) => {
      let { start, input: { file, map } } = declaration.source;
      let consumer = map.consumer(), original = consumer.originalPositionFor(start).source, resolved = relative(dirname(file), resolve(dirname(original), url.replace(/['"]/g, "")));
      return resolved.replaceAll("\\", "/");
    };
    module.exports = postCssResolveUrls;
  }
});
export default require_postcss_resolve_urls();
