type BemClassConfig = {
    element: Element;
    classes: string[];
    blockName: string;
    elementSeparator: string;
    modifierSeparator: string;
    modifierClass?: string;
};
declare const manipulateBemClasses: ({ element, classes, blockName, elementSeparator, modifierSeparator, modifierClass }: BemClassConfig) => void;
export { manipulateBemClasses };
