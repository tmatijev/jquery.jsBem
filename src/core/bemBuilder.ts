type BemConfig = {
  elementSeparator?: string;
  modifierSeparator?: string;
  modifierClass?: string;
};

const createBemHelper = (blockName: string, config: BemConfig = {}) => {
  const {
    elementSeparator = '__',
    modifierSeparator = '--',
    modifierClass = ''
  } = config;

  const findBemElements = (root: Element = document.body) => 
    root.querySelectorAll(`[data-bem="${blockName}"]`);
    
  const findBemBlocks = (root: Element = document.body) => 
    root.querySelectorAll(`[data-bem-block="${blockName}"]`);

  const addModifier = (element: Element, modifier: string) => {
    const baseClass = element.getAttribute('data-bem-block') ? 
      blockName : 
      element.className.split(' ').find(c => c.startsWith(blockName));
      
    if (baseClass) {
      element.classList.add(`${baseClass}${modifierSeparator}${modifier}`);
    }
  };

  return {
    findBemElements,
    findBemBlocks,
    addModifier
  };
};

export { createBemHelper };
export type { BemConfig }; 