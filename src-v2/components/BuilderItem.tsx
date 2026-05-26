import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { BaseItemConfig, FormItemDefinition } from '../types/FormItem';

interface Props {
  item: BaseItemConfig;
  def: FormItemDefinition;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdate: (patch: Partial<BaseItemConfig>) => void;
  onDuplicate: () => void;
}

export function BuilderItem({
  item, def, isSelected, isFirst, isLast,
  onSelect, onRemove, onMoveUp, onMoveDown, onUpdate, onDuplicate,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item._uid,
  });

  const showToolbar = isHovered || isSelected;

  const wrapperClass = [
    `col-md-${item.size}`,
    'position-relative rounded-3 p-1',
    isSelected
      ? 'bg-primary bg-opacity-10 border border-primary border-opacity-75 shadow-sm'
      : isHovered
      ? 'bg-body-secondary'
      : '',
  ].join(' ');

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className={wrapperClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      {/* Floating toolbar */}
      {showToolbar && (
        <div
          className="position-absolute top-0 end-0 mt-1 me-1"
          style={{ zIndex: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="d-flex align-items-center bg-body border border-secondary-subtle rounded-pill shadow-sm px-2 py-1 gap-1">
            <button
              type="button"
              className="btn btn-link btn-sm text-body-secondary text-decoration-none p-0 lh-1"
              title="Перетащить"
              style={{ cursor: 'grab' }}
              {...attributes}
              {...listeners}
            >
              <i className="bi bi-grip-vertical" />
            </button>

            <div className="vr opacity-25" />

            <button
              type="button"
              className="btn btn-link btn-sm text-body-secondary text-decoration-none p-0 lh-1"
              disabled={isFirst}
              onClick={onMoveUp}
              title="Вверх"
            >
              <i className="bi bi-chevron-up" />
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm text-body-secondary text-decoration-none p-0 lh-1"
              disabled={isLast}
              onClick={onMoveDown}
              title="Вниз"
            >
              <i className="bi bi-chevron-down" />
            </button>

            <div className="vr opacity-25" />

            <button
              type="button"
              className="btn btn-link btn-sm text-body-secondary text-decoration-none p-0 lh-1"
              onClick={onDuplicate}
              title="Дублировать"
            >
              <i className="bi bi-copy" />
            </button>

            <div className="vr opacity-25" />

            <button
              type="button"
              className="btn btn-link btn-sm text-danger text-decoration-none p-0 lh-1"
              onClick={onRemove}
              title="Удалить"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
        </div>
      )}

      <def.BuilderItem
        config={item as never}
        onChange={onUpdate as never}
        onDelete={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </div>
  );
}
