import React from 'react';
import type { BaseItemConfig, FormItemDefinition } from '../types/FormItem';

interface Props {
  selectedItem: BaseItemConfig | null;
  selectedDef: FormItemDefinition | null;
  onUpdate: (patch: Partial<BaseItemConfig>) => void;
}

export function ConfigPanel({ selectedItem, selectedDef, onUpdate }: Props) {
  if (!selectedItem || !selectedDef) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-body-secondary gap-3 py-5 px-3"
        style={{ minHeight: 200 }}
      >
        <div
          className="rounded-circle bg-body-secondary d-flex align-items-center justify-content-center"
          style={{ width: 48, height: 48 }}
        >
          <i className="bi bi-cursor fs-4" />
        </div>
        <span className="small text-center">Выберите элемент для настройки</span>
      </div>
    );
  }

  return (
    <>
      <div className="px-3 pt-3 pb-2 d-flex align-items-center gap-2">
        <span className="badge text-bg-primary rounded-2 p-2 lh-1">
          <i className={`bi bi-${selectedDef.icon}`} />
        </span>
        <span className="fw-semibold small">{selectedDef.label}</span>
      </div>

      <hr className="my-0 opacity-25" />

      <div
        className="p-3 d-flex flex-column gap-3 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        <selectedDef.ConfigPanel
          config={selectedItem as never}
          onChange={onUpdate as never}
        />
      </div>
    </>
  );
}
