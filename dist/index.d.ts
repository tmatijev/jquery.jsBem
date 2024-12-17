type BemInitOptions = {
    bemESeparator?: string;
    bemMSeparator?: string;
    bemBlock: string;
    modifierClass?: string;
};
declare const initBem: (options: BemInitOptions) => {
    updateModifier: (element: Element, newModifier: string) => void;
    findBemElements: (root?: Element) => NodeListOf<Element>;
    findBemBlocks: (root?: Element) => NodeListOf<Element>;
    addModifier: (element: Element, modifier: string) => void;
};
export { initBem };
export type { BemInitOptions };
