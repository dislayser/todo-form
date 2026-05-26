import React, { type ReactNode } from 'react';
import type { InputItemConfig, FieldSize, GridSize } from '../types/FormItem';

// ─── Field size CSS class ─────────────────────────────────────────────────────

export function fieldSizeClass(fs: FieldSize, variant: 'control' | 'select' = 'control') {
  const base = variant === 'control' ? 'form-control' : 'form-select';
  if (fs === 1) return `${base} ${base}-sm`;
  if (fs === 2) return `${base} ${base}-lg`;
  return base;
}

// ─── Primitive config UI atoms ────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="form-label small mb-1">{label}</label>
      {children}
    </div>
  );
}

export function Txt({
  label, value, placeholder, onChange,
}: {
  label: string; value: string | undefined; placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <input
        className="form-control form-control-sm"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function Num({
  label, value, onChange, min, max,
}: {
  label: string; value: number | null | undefined;
  onChange: (v: number | null) => void; min?: number; max?: number;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        className="form-control form-control-sm"
        value={value ?? ''}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      />
    </Field>
  );
}

export function Chk({ label, checked, onChange }: {
  label: string; checked: boolean | undefined; onChange: (v: boolean) => void;
}) {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        checked={checked ?? false}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="form-check-label small">{label}</label>
    </div>
  );
}

export function Sel({ label, value, options, onChange }: {
  label: string; value: string | number | undefined;
  options: { value: string | number; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select
        className="form-select form-select-sm"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Field>
  );
}

export function SizeField({ value, onChange }: {
  value: number | undefined; onChange: (v: GridSize) => void;
}) {
  return (
    <Num
      label="Ширина (1–12)"
      value={value}
      onChange={(v) => onChange((v ?? 12) as GridSize)}
      min={1}
      max={12}
    />
  );
}

export function OptionsArea({ value, onChange }: {
  value: string[]; onChange: (v: string[]) => void;
}) {
  return (
    <Field label="Варианты (каждый на новой строке, формат: label или value::label)">
      <textarea
        className="form-control form-control-sm font-monospace"
        rows={4}
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
      />
    </Field>
  );
}

// ─── Bootstrap colour options ─────────────────────────────────────────────────

export const bsColors = [
  { value: '', label: 'По умолчанию' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'success', label: 'Success' },
  { value: 'danger', label: 'Danger' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'dark', label: 'Dark' },
];

export const fieldSizeOpts = [
  { value: 0, label: 'Обычный' },
  { value: 1, label: 'Малый' },
  { value: 2, label: 'Большой' },
];

// ─── Shared config panel for all input-like items ─────────────────────────────

export function InputConfig<T extends InputItemConfig>({
  config, onChange, extra,
}: {
  config: T; onChange: (patch: Partial<T>) => void; extra?: ReactNode;
}) {
  return (
    <>
      <Txt label="Подпись" value={config.label_text} onChange={(v) => onChange({ label_text: v } as Partial<T>)} />
      <Txt label="Name" value={config.name} onChange={(v) => onChange({ name: v } as Partial<T>)} />
      <Txt label="ID" value={config.id} onChange={(v) => onChange({ id: v } as Partial<T>)} />
      <Txt label="Placeholder" value={config.placeholder} onChange={(v) => onChange({ placeholder: v } as Partial<T>)} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v } as Partial<T>)} />
      <Sel
        label="Размер поля"
        value={config.field_size}
        options={fieldSizeOpts}
        onChange={(v) => onChange({ field_size: Number(v) as FieldSize } as Partial<T>)}
      />
      <Chk label="Обязательное" checked={config.required} onChange={(v) => onChange({ required: v } as Partial<T>)} />
      <Chk label="Выключено" checked={config.disabled} onChange={(v) => onChange({ disabled: v } as Partial<T>)} />
      {extra}
    </>
  );
}

// ─── Label with red required star ─────────────────────────────────────────────

export function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="form-label">
      {text}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
  );
}
