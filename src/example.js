import { createBemHelper } from './core/bemBuilder';

// Can be used with any block name
const menuBem = createBemHelper('menu');
const headerBem = createBemHelper('header', {
  modifierClass: 'mod'
});

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.js-menu-toggle');
  
  toggleButton?.addEventListener('click', () => {
    const menuBlock = menuBem.findBemBlocks().item(0);
    if (menuBlock) {
      menuBem.addModifier(menuBlock, 'expanded');
    }
  });
}); 