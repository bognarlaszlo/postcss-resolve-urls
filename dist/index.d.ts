declare const postCssResolveUrls: (options?: {
    debug: boolean;
}) => {
    postcssPlugin: string;
    Declaration(declaration: any): void;
};
export = postCssResolveUrls;
