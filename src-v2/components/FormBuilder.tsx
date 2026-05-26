import React, { JSX, useRef, useState } from 'react';
import { useBuilderState } from '../hooks/useBuilderState';
import { EditorHeader } from './EditorHeader';
import { EditorCanvas } from './EditorCanvas';
import { ItemsSidebar } from './ItemsSidebar';
import { ConfigPanel } from './ConfigPanel';
import { FormPreview } from './FormPreview';
import type { BaseItemConfig, FormItemDefinition } from '../types/FormItem';

interface Props {
  initialItems?: BaseItemConfig[];
  itemDefinitions: FormItemDefinition[];
  onChange?: (items: BaseItemConfig[]) => void;
}

export function FormBuilder({ initialItems = [], itemDefinitions, onChange }: Props): JSX.Element {
  const {
    items, selectedId,
    addItem, removeItem, duplicateItem, reorderItems, selectItem, updateItem, setAllItems,
  } = useBuilderState();

  const [previewOpen, setPreviewOpen] = useState(false);

  React.useEffect(() => {
    if (initialItems.length > 0) setAllItems(initialItems);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    onChange?.(items);
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedItem = items.find(i => i._uid === selectedId) ?? null;
  const selectedDef  = selectedItem ? (itemDefinitions.find(d => d.type === selectedItem._type) ?? null) : null;

  return (
    <div onClick={() => selectItem(null)}>
      <EditorHeader
        items={items}
        onSetAll={setAllItems}
        onPreview={() => setPreviewOpen(true)}
      />

      <div className="d-flex gap-3 align-items-start">

        {/* ── Config panel ───────────────────────────────── */}
        <div
          className="flex-shrink-0 sticky-top"
          style={{ width: 220, top: 8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card border-0 shadow-sm rounded-3">
            <ConfigPanel
              selectedItem={selectedItem}
              selectedDef={selectedDef}
              onUpdate={(patch) => selectedId && updateItem(selectedId, patch)}
            />
          </div>
        </div>

        {/* ── Canvas ─────────────────────────────────────── */}
        <div
          className="flex-fill user-select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card border-0 shadow-sm rounded-3">
            <EditorCanvas
              items={items}
              selectedId={selectedId}
              itemDefinitions={itemDefinitions}
              onSelect={selectItem}
              onRemove={removeItem}
              onDuplicate={duplicateItem}
              onReorder={reorderItems}
              onUpdate={updateItem}
            />
          </div>
        </div>

        {/* ── Items sidebar ──────────────────────────────── */}
        <ItemsSidebar
          itemDefinitions={itemDefinitions}
          onAdd={(def) => addItem(def.defaultConfig)}
        />

      </div>

      {previewOpen && (
        <FormPreview
          items={items}
          itemDefinitions={itemDefinitions}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
