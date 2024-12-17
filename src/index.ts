import { createBemHelper } from './core/bemBuilder';
import { bemClassController } from './core/bemClassController';

type BemInitOptions = {
  bemESeparator?: string;
  bemMSeparator?: string;
  bemBlock: string;
  modifierClass?: string;
};

const initBem = (options: BemInitOptions) => {
  const {
    bemESeparator = '__',
    bemMSeparator = '--',
    bemBlock,
    modifierClass = ''
  } = options;

  const bemHelper = createBemHelper(bemBlock, {
    elementSeparator: bemESeparator,
    modifierSeparator: bemMSeparator,
    modifierClass
  });

  // Initialize BEM classes
  const blocks = bemHelper.findBemBlocks();
  const elements = bemHelper.findBemElements();

  // Process blocks
  blocks.forEach(block => {
    if (modifierClass) {
      block.classList.add(`${bemBlock}${bemMSeparator}${modifierClass}`);
    }
  });

  // Process elements
  elements.forEach(element => {
    const classes = element.className.split(' ');
    const baseClass = classes.find(c => c.startsWith(bemBlock));
    
    if (baseClass && modifierClass) {
      // Add modifier to base element class
      element.classList.add(`${bemBlock}${bemMSeparator}${modifierClass}`);
      
      // If it's an element (contains separator), add modified element class
      if (baseClass.includes(bemESeparator)) {
        const [block, elementName] = baseClass.split(bemESeparator);
        element.classList.add(`${block}${bemMSeparator}${modifierClass}${bemESeparator}${elementName}`);
      }
    }
  });

  return {
    ...bemHelper,
    updateModifier: (element: Element, newModifier: string) => {
      bemClassController({
        element,
        classes: [element.className],
        elementSeparator: bemESeparator,
        modifierSeparator: bemMSeparator,
        modifierClass: newModifier
      });
    }
  };
};

export { initBem };
export type { BemInitOptions }; 