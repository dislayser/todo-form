import React from 'react';
import type { FormItemDefinition } from '../types/FormItem';

interface Props {
  itemDefinitions: FormItemDefinition[];
  onAdd: (def: FormItemDefinition) => void;
}

const CATEGORIES = [
  { label: 'Текст',   types: ['header', 'paragraph', 'hr'] },
  { label: 'Поля',    types: ['text', 'number', 'password', 'textarea'] },
  { label: 'Выбор',   types: ['select', 'datalist', 'checkbox'] },
  { label: 'Дата',    types: ['date', 'datetime', 'file'] },
  { label: 'Прочее',  types: ['hidden', 'button', 'div', 'part'] },
];

export function ItemsSidebar({ itemDefinitions, onAdd }: Props) {
  return (
    <div
      className="card border-0 shadow-sm rounded-3 overflow-hidden sticky-top flex-shrink-0"
      style={{ top: 8, width: 168 }}
    >
      <div className="card-header border-0 bg-body-tertiary px-3 py-2">
        <span className="small fw-semibold text-body-secondary">Элементы</span>
      </div>

      <div className="card-body p-2 d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
        {CATEGORIES.map(({ label, types }) => {
          const defs = types
            .map(t => itemDefinitions.find(d => d.type === t))
            .filter(Boolean) as FormItemDefinition[];
          if (defs.length === 0) return null;

          return (
            <div key={label}>
              <div className="text-body-secondary px-1 mb-1 fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {label}
              </div>
              <div className="d-flex flex-column gap-1">
                {defs.map(def => (
                  <button
                    key={def.type}
                    type="button"
                    className="btn btn-sm btn-outline-secondary text-start d-flex align-items-center gap-2 rounded-2"
                    onClick={() => onAdd(def)}
                  >
                    <i className={`bi bi-${def.icon} flex-shrink-0`} style={{ width: 14 }} />
                    <span className="text-truncate" style={{ fontSize: '0.8rem' }}>{def.label}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
