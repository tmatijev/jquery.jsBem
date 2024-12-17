export type BemModifier = string | Record<string, boolean>;

export interface BemOptions {
  elementSeparator?: string;
  modifierSeparator?: string;
}

export interface BemBuilder {
  block: (modifier?: BemModifier) => string;
  element: (element: string, modifier?: BemModifier) => string;
} 