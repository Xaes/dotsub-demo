declare module "global/window" {
    const window: Window;
    export default window;
}

declare module "global/document" {
    const document: Document;
    export default document;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.jpeg" {
    const content: any;
    export default content;
}