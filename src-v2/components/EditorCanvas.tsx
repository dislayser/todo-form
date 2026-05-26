import React from 'react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BuilderItem } from './BuilderItem';
import type { BaseItemConfig, FormItemDefinition } from '../types/FormItem';

interface Props {
  items: BaseItemConfig[];
  selectedId: string | null;
  itemDefinitions: FormItemDefinition[];
  onSelect: (uid: string | null) => void;
  onRemove: (uid: string) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
  onUpdate: (uid: string, patch: Partial<BaseItemConfig>) => void;
  onDuplicate: (uid: string) => void;
}

export function EditorCanvas({
  items, selectedId, itemDefinitions, onSelect, onRemove, onReorder, onUpdate, onDuplicate,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(i => i._uid === active.id);
    const newIndex = items.findIndex(i => i._uid === over.id);
    if (oldIndex !== -1 && newIndex !== -1) onReorder(oldIndex, newIndex);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i._uid)} strategy={verticalListSortingStrategy}>
        <div className="p-3 row g-2" style={{ minHeight: 320 }}>
          {items.length === 0 ? (
            <div className="col-12 d-flex flex-column align-items-center justify-content-center text-body-secondary gap-3 py-5">
              <div
                className="rounded-circle bg-body-secondary d-flex align-items-center justify-content-center"
                style={{ width: 64, height: 64 }}
              >
                <i className="bi bi-plus-lg fs-3" />
              </div>
              <div className="text-center">
                <div className="fw-semibold mb-1">Форма пустая</div>
                <div className="small">Добавьте элементы из панели справа</div>
              </div>
            </div>
          ) : (
            items.map((item, index) => {
              const def = itemDefinitions.find(d => d.type === item._type);
              if (!def) return null;
              return (
                <BuilderItem
                  key={item._uid}
                  item={item}
                  def={def}
                  isSelected={item._uid === selectedId}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  onSelect={() => onSelect(item._uid === selectedId ? null : item._uid)}
                  onRemove={() => onRemove(item._uid)}
                  onMoveUp={() => onReorder(index, index - 1)}
                  onMoveDown={() => onReorder(index, index + 1)}
                  onUpdate={(patch) => onUpdate(item._uid, patch)}
                  onDuplicate={() => onDuplicate(item._uid)}
                />
              );
            })
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
