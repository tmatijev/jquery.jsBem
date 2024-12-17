// Mock console.warn to avoid noise in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
});

// Clean up DOM after each test
afterEach(() => {
  document.body.innerHTML = '';
}); 