type BemConfig = {
    elementSeparator?: string;
    modifierSeparator?: string;
    modifierClass?: string;
};
declare const createBemHelper: (blockName: string, config?: BemConfig) => {
    findBemElements: (root?: Element) => NodeListOf<Element>;
    findBemBlocks: (root?: Element) => NodeListOf<Element>;
    addModifier: (element: Element, modifier: string) => void;
};
export { createBemHelper };
export type { BemConfig };
