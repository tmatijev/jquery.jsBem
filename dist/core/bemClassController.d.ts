type BemClassControllerConfig = {
    element: Element;
    classes: string[];
    elementSeparator: string;
    modifierSeparator: string;
    modifierClass: string;
};
declare const bemClassController: ({ element, classes, elementSeparator, modifierSeparator, modifierClass }: BemClassControllerConfig) => void;
export { bemClassController };
export type { BemClassControllerConfig };
