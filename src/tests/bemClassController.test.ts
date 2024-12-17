import { bemClassController } from '../core/bemClassController';

describe('BemClassController', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  test('handles BEM element classes', () => {
    element.className = 'person__hand';
    
    bemClassController({
      element,
      classes: ['person__hand'],
      elementSeparator: '__',
      modifierSeparator: '--',
      modifierClass: 'mod'
    });

    expect(element.classList.contains('person--mod__hand')).toBe(true);
  });

  test('handles BEM modifier classes', () => {
    element.className = 'person--tall';
    
    bemClassController({
      element,
      classes: ['person--tall'],
      elementSeparator: '__',
      modifierSeparator: '--',
      modifierClass: 'mod'
    });

    expect(element.classList.contains('person--mod--tall')).toBe(true);
  });

  test('warns on deep nesting', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    element.className = 'person__hand__finger';
    
    bemClassController({
      element,
      classes: ['person__hand__finger'],
      elementSeparator: '__',
      modifierSeparator: '--',
      modifierClass: 'mod'
    });

    expect(consoleSpy).toHaveBeenCalled();
  });
}); 