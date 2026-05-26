import type { BaseItemConfig } from '../types/FormItem';

const ALIGN_MAP: Record<number, string> = {
  0: 'start',
  1: 'center',
  2: 'end',
  3: 'justify',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateItem(raw: any): BaseItemConfig {
  const item = { ...raw };

  // Every item must have _uid
  if (!item._uid) {
    item._uid = crypto.randomUUID();
  }

  switch (item._type) {
    case 'header':
      if (item.item_type && !item.level) {
        item.level = item.item_type;
        delete item.item_type;
      }
      if (!item.level) item.level = 'h2';
      // Old: align stored as number 0-3
      if (typeof item.align === 'number') {
        item.align = ALIGN_MAP[item.align] ?? 'start';
      }
      break;

    case 'button':
      if (item.item_type && !item.buttonType) {
        item.buttonType = item.item_type;
        delete item.item_type;
      }
      if (!item.buttonType) item.buttonType = 'button';
      // Old: btn_size = 0|1|2 → new: btnSize
      if (item.btn_size !== undefined && item.btnSize === undefined) {
        item.btnSize = item.btn_size;
        delete item.btn_size;
      }
      break;

    case 'paragraph':
      // Old: align = 0 | 1 | 2 | 3 (numeric index)
      if (typeof item.align === 'number') {
        item.align = ALIGN_MAP[item.align] ?? 'start';
      }
      break;
  }

  return item as BaseItemConfig;
}

export function migrateSchema(raw: unknown[]): BaseItemConfig[] {
  return raw.map(migrateItem);
}
