import type { ReactElement } from 'react';

// ─── Primitive types ──────────────────────────────────────────────────────────

export type ItemType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'datetime'
  | 'file'
  | 'hidden'
  | 'password'
  | 'datalist'
  | 'header'
  | 'paragraph'
  | 'button'
  | 'hr'
  | 'div'
  | 'part';

/** Bootstrap grid column width (1–12) */
export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Visual size of an input field: 0 = normal, 1 = sm, 2 = lg */
export type FieldSize = 0 | 1 | 2;

// ─── Config interfaces ────────────────────────────────────────────────────────

/** Fields every item config must have */
export interface BaseItemConfig {
  _type: ItemType;
  /** Internal unique key used by the builder (not the HTML `id` attribute) */
  _uid: string;
  size: GridSize;
}

/** Common fields shared by interactive input items */
export interface InputItemConfig extends BaseItemConfig {
  id: string;
  name: string;
  label_text: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  field_size: FieldSize;
}

// ─── Component prop interfaces ────────────────────────────────────────────────

/** Props passed to an item component when it lives inside the builder canvas */
export interface BuilderItemProps<TConfig extends BaseItemConfig = BaseItemConfig> {
  config: TConfig;
  onChange: (patch: Partial<TConfig>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

/** Props passed to the configuration panel for an item */
export interface ConfigPanelProps<TConfig extends BaseItemConfig = BaseItemConfig> {
  config: TConfig;
  onChange: (patch: Partial<TConfig>) => void;
}

/** Props passed to an item component when the form is rendered for end users */
export interface RenderItemProps<TConfig extends BaseItemConfig = BaseItemConfig> {
  config: TConfig;
  value?: unknown;
  onChange?: (name: string, value: unknown) => void;
}

// ─── Item definition ──────────────────────────────────────────────────────────

/**
 * Contract that every form item module must satisfy.
 * Register each item in the item registry to make it available in the builder.
 */
export interface FormItemDefinition<TConfig extends BaseItemConfig = BaseItemConfig> {
  type: ItemType;
  /** Bootstrap Icons name, e.g. `'input-cursor'` */
  icon: string;
  /** Human-readable label shown in the builder sidebar */
  label: string;
  /** Default config used when the item is first dropped onto the canvas */
  defaultConfig: Omit<TConfig, '_uid'>;
  /** Item component for the builder canvas (includes toolbar / edit handles) */
  BuilderItem: (props: BuilderItemProps<TConfig>) => ReactElement;
  /** Settings panel rendered when the item is selected */
  ConfigPanel: (props: ConfigPanelProps<TConfig>) => ReactElement;
  /** Read-only component used when rendering the finished form */
  RenderItem: (props: RenderItemProps<TConfig>) => ReactElement;
  /** If true, RenderItem is rendered without a col wrapper (e.g. hidden inputs) */
  noWrapper?: boolean;
}
