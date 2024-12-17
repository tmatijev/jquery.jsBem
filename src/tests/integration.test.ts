import { initBem } from '../index';

describe('BEM Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="person" data-bem-block="person">
        <div class="person__hand" data-bem="person">
          <h2 class="person__hand--left" data-bem="person">Left hand</h2>
        </div>
        <div class="person--blind" data-bem="person">
          <div class="hand" data-bem-block="hand">
            <div class="hand__left" data-bem="hand"></div>
          </div>
        </div>
      </div>
    `;
  });

  test('initializes nested BEM blocks', () => {
    const personBem = initBem({
      bemBlock: 'person',
      modifierClass: 'mod'
    });

    const handBem = initBem({
      bemBlock: 'hand',
      modifierClass: 'mod'
    });

    const personElements = document.querySelectorAll('[data-bem="person"]');
    const handElements = document.querySelectorAll('[data-bem="hand"]');

    expect(personElements[0].classList.contains('person--mod')).toBe(true);
    expect(handElements[0].classList.contains('hand--mod')).toBe(true);
  });
}); 