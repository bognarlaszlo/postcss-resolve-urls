declare const postCssResolveUrls: (options?: {}) => {
    postcssPlugin: string;
    Declaration(declaration: any): void;
};
export = postCssResolveUrls;
