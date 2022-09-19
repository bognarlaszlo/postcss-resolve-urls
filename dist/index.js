var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// index.ts
var import_path = __toModule(require("path"));
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
  let consumer = map.consumer(), original = consumer.originalPositionFor(start).source, resolved = (0, import_path.relative)((0, import_path.dirname)(file), (0, import_path.resolve)((0, import_path.dirname)(original), url.replace(/['"]/g, "")));
  return resolved.replaceAll("\\", "/");
};
module.exports = postCssResolveUrls;
