type BemClassControllerConfig = {
  element: Element;
  classes: string[];
  elementSeparator: string;
  modifierSeparator: string;
  modifierClass: string;
};

const bemClassController = ({
  element,
  classes,
  elementSeparator,
  modifierSeparator,
  modifierClass
}: BemClassControllerConfig) => {
  const isBemElement = (className: string) => 
    className.split(elementSeparator).length > 1;
  
  const isBemModifier = (className: string) => 
    className.split(modifierSeparator).length > 1;

  const setFinalBemClass = (
    baseClass: string, 
    bemSeparator: string
  ) => {
    const splitClasses = baseClass.split(' ');
    const classesLength = splitClasses.length;
    let finalClass = '';

    for (let i = 0; i < classesLength; i++) {
      if (i === classesLength - 1 && i < 2) {
        finalClass += splitClasses[i];
      } else if (i < 1) {
        finalClass += splitClasses[i] + modifierSeparator + modifierClass + bemSeparator;
      } else if (i > 1) {
        finalClass += splitClasses[i];
        console.warn("Please try to keep your BEM elements with less nesting.", element);
      } else {
        finalClass += splitClasses[i] + bemSeparator;
      }
    }

    return finalClass;
  };

  const baseClass = classes[0];
  if (isBemElement(baseClass)) {
    const processedClass = baseClass.split(elementSeparator).join(' ');
    element.classList.add(setFinalBemClass(processedClass, elementSeparator));
  } else if (isBemModifier(baseClass)) {
    const processedClass = baseClass.split(modifierSeparator).join(' ');
    element.classList.add(setFinalBemClass(processedClass, modifierSeparator));
  }
};

export { bemClassController };
export type { BemClassControllerConfig }; 