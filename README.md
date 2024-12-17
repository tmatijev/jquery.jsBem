# Modern BEM Class Manager 🎨

A lightweight, TypeScript-first utility for managing BEM classes in modern web applications.

[![npm version](https://img.shields.io/npm/v/modern-bem-class-manager.svg)](https://www.npmjs.com/package/modern-bem-class-manager)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/modern-bem-class-manager)](https://bundlephobia.com/package/modern-bem-class-manager)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🚀 Modern TypeScript implementation
- 🎯 Zero dependencies
- 🔍 Smart BEM class detection
- 🛠️ Flexible modifier management
- ⚡ Tree-shakeable ESM support
- 🎨 Customizable separators

## 📦 Installation

npm install modern-bem-class-manager
# or
yarn add modern-bem-class-manager
# or
pnpm add modern-bem-class-manager

## 🚀 Quick Start

```typescript
import { createBEM } from 'modern-bem-class-manager';

// Create a BEM instance
const bem = createBEM('card');

// Use it in your components
const className = bem({
  element: 'title',
  modifiers: ['large', { highlighted: true }]
});
// Result: 'card__title card__title--large card__title--highlighted'
```

## 🎯 Usage with React

```typescript
import { createBEM } from 'modern-bem-class-manager';

const Card = ({ isHighlighted, size = 'medium' }) => {
  const bem = createBEM('card');
  
  return (
    <div className={bem({ modifiers: [{ highlighted: isHighlighted }] })}>
      <h2 className={bem({ element: 'title', modifiers: [size] })}>
        Hello World
      </h2>
      <p className={bem({ element: 'content' })}>
        Content goes here
      </p>
    </div>
  );
};
```

## ⚙️ Configuration

```typescript
const bem = createBEM('block', {
  elementSeparator: '__',  // Default
  modifierSeparator: '--', // Default
  strict: true            // Enables strict mode
});
```

## 🔧 API Reference

### `createBEM(block: string, options?: BEMOptions)`

Creates a new BEM instance for the given block name.

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `elementSeparator` | `string` | `'__'` | Separator between block and element |
| `modifierSeparator` | `string` | `'--'` | Separator for modifiers |
| `strict` | `boolean` | `false` | Enables strict mode validation |

## 📝 License

MIT © [Your Name]

---

<p align="center">Made with ❤️ for modern web development</p>
