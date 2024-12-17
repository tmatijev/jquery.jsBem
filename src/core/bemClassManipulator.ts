type BemClassConfig = {
  element: Element;
  classes: string[];
  blockName: string;
  elementSeparator: string;
  modifierSeparator: string;
  modifierClass?: string;
};

const manipulateBemClasses = ({
  element,
  classes,
  blockName,
  elementSeparator,
  modifierSeparator,
  modifierClass = ''
}: BemClassConfig) => {
  const isBemElement = (className: string) => 
    className.startsWith(blockName + elementSeparator);
  
  const isBemModifier = (className: string) => 
    className.includes(modifierSeparator);

  classes.forEach(className => {
    if (isBemElement(className) || isBemModifier(className)) {
      const parts = className.split(elementSeparator);
      if (parts.length > 2) {
        console.warn('Detected deep BEM nesting. Consider simplifying your BEM structure:', element);
      }
      
      const newClass = parts
        .filter(Boolean)
        .join(modifierClass ? modifierSeparator + modifierClass + elementSeparator : elementSeparator);
      
      element.classList.add(newClass);
    }
  });
};

export { manipulateBemClasses }; 