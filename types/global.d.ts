/** Global definitions **/

declare var __ISDEVENV__: boolean;

// for style loader
declare module '*.css' {
    const styles: any;
    export = styles;
}

// for redux devtools extension
declare interface Window {
    devToolsExtension?(): (args?: any) => any;
    apiRoot: string;
}

