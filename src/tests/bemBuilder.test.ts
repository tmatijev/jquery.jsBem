import { createBemHelper } from '../core/bemBuilder';

describe('BemBuilder', () => {
  const personBem = createBemHelper('person');
  
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="person" data-bem-block="person">
        <div class="person__hand" data-bem="person">
          <h2 class="person__hand--left" data-bem="person">Left hand</h2>
        </div>
      </div>
    `;
  });

  test('finds BEM blocks', () => {
    const blocks = personBem.findBemBlocks();
    expect(blocks.length).toBe(1);
    expect(blocks[0].className).toBe('person');
  });

  test('finds BEM elements', () => {
    const elements = personBem.findBemElements();
    expect(elements.length).toBe(2);
  });

  test('adds modifier to block', () => {
    const block = personBem.findBemBlocks()[0];
    personBem.addModifier(block, 'tall');
    expect(block.classList.contains('person--tall')).toBe(true);
  });
}); 