import React from 'react';
import type { FormItemDefinition, InputItemConfig, BaseItemConfig } from '../types/FormItem';

// ─── Shared placeholder renderer ─────────────────────────────────────────────

function PlaceholderBlock({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="border rounded p-2 text-muted small d-flex align-items-center gap-2 bg-light">
      <i className={`bi bi-${icon}`} />
      <span>{label}</span>
    </div>
  );
}

function PlaceholderConfig({ config, onChange }: { config: InputItemConfig; onChange: (p: Partial<InputItemConfig>) => void }) {
  return (
    <>
      <div>
        <label className="form-label small mb-1">Подпись</label>
        <input
          className="form-control form-control-sm"
          value={config.label_text ?? ''}
          onChange={(e) => onChange({ label_text: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label small mb-1">Name</label>
        <input
          className="form-control form-control-sm"
          value={config.name ?? ''}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label small mb-1">Placeholder</label>
        <input
          className="form-control form-control-sm"
          value={config.placeholder ?? ''}
          onChange={(e) => onChange({ placeholder: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label small mb-1">Ширина (1–12)</label>
        <input
          type="number"
          className="form-control form-control-sm"
          min={1}
          max={12}
          value={config.size}
          onChange={(e) => onChange({ size: Number(e.target.value) as InputItemConfig['size'] })}
        />
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="req"
          checked={config.required}
          onChange={(e) => onChange({ required: e.target.checked })}
        />
        <label className="form-check-label small" htmlFor="req">Обязательное</label>
      </div>
    </>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────

interface TextConfig extends InputItemConfig { _type: 'text'; value: string; maxlength: number | null }

export const textInputDef: FormItemDefinition<TextConfig> = {
  type: 'text',
  icon: 'input-cursor',
  label: 'Текстовое поле',
  defaultConfig: {
    _type: 'text',
    size: 6,
    id: '',
    name: '',
    label_text: 'Текстовое поле',
    placeholder: 'Введите текст',
    required: false,
    disabled: false,
    field_size: 0,
    value: '',
    maxlength: null,
  },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <label className="form-label small mb-1">{config.label_text || <span className="text-muted">Подпись</span>}</label>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder={config.placeholder}
        disabled
      />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <PlaceholderConfig config={config} onChange={onChange as never} />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <label className="form-label">{config.label_text}</label>
      <input
        type="text"
        className="form-control"
        name={config.name}
        id={config.id}
        placeholder={config.placeholder}
        required={config.required}
        disabled={config.disabled}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── Number input ─────────────────────────────────────────────────────────────

interface NumberConfig extends InputItemConfig { _type: 'number'; value: string; min: number | null; max: number | null }

export const numberInputDef: FormItemDefinition<NumberConfig> = {
  type: 'number',
  icon: '123',
  label: 'Число',
  defaultConfig: {
    _type: 'number',
    size: 6,
    id: '',
    name: '',
    label_text: 'Числовое поле',
    placeholder: 'Введите число',
    required: false,
    disabled: false,
    field_size: 0,
    value: '',
    min: null,
    max: null,
  },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <label className="form-label small mb-1">{config.label_text || <span className="text-muted">Подпись</span>}</label>
      <input type="number" className="form-control form-control-sm" placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <PlaceholderConfig config={config} onChange={onChange as never} />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <label className="form-label">{config.label_text}</label>
      <input type="number" className="form-control" name={config.name} placeholder={config.placeholder} onChange={(e) => onChange?.(config.name, e.target.value)} />
    </div>
  ),
};

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaConfig extends InputItemConfig { _type: 'textarea'; rows: number }

export const textareaDef: FormItemDefinition<TextareaConfig> = {
  type: 'textarea',
  icon: 'textarea-resize',
  label: 'Большое поле',
  defaultConfig: {
    _type: 'textarea',
    size: 12,
    id: '',
    name: '',
    label_text: 'Большое поле',
    placeholder: 'Введите текст',
    required: false,
    disabled: false,
    field_size: 0,
    rows: 3,
  },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <label className="form-label small mb-1">{config.label_text}</label>
      <textarea className="form-control form-control-sm" rows={config.rows} placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <PlaceholderConfig config={config} onChange={onChange as never} />
  ),
  RenderItem: ({ config }) => (
    <div>
      <label className="form-label">{config.label_text}</label>
      <textarea className="form-control" name={config.name} rows={config.rows} placeholder={config.placeholder} />
    </div>
  ),
};

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectConfig extends InputItemConfig { _type: 'select'; options: string[] }

export const selectDef: FormItemDefinition<SelectConfig> = {
  type: 'select',
  icon: 'list-task',
  label: 'Список',
  defaultConfig: {
    _type: 'select',
    size: 6,
    id: '',
    name: '',
    label_text: 'Список',
    placeholder: '',
    required: false,
    disabled: false,
    field_size: 0,
    options: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
  },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <label className="form-label small mb-1">{config.label_text}</label>
      <select className="form-select form-select-sm" disabled>
        {config.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <PlaceholderConfig config={config} onChange={onChange as never} />
  ),
  RenderItem: ({ config }) => (
    <div>
      <label className="form-label">{config.label_text}</label>
      <select className="form-select" name={config.name}>
        {config.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  ),
};

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxConfig extends BaseItemConfig { _type: 'checkbox'; name: string; id: string; label_text: string; required: boolean; disabled: boolean; value: boolean }

export const checkboxDef: FormItemDefinition<CheckboxConfig> = {
  type: 'checkbox',
  icon: 'check-square',
  label: 'Галочка',
  defaultConfig: {
    _type: 'checkbox',
    size: 6,
    id: '',
    name: '',
    label_text: 'Галочка',
    required: false,
    disabled: false,
    value: false,
  },
  BuilderItem: ({ config }) => (
    <div className="p-2 form-check">
      <input type="checkbox" className="form-check-input" disabled />
      <label className="form-check-label small">{config.label_text}</label>
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <>
      <div>
        <label className="form-label small mb-1">Подпись</label>
        <input className="form-control form-control-sm" value={config.label_text} onChange={(e) => onChange({ label_text: e.target.value })} />
      </div>
      <div>
        <label className="form-label small mb-1">Ширина (1–12)</label>
        <input type="number" className="form-control form-control-sm" min={1} max={12} value={config.size} onChange={(e) => onChange({ size: Number(e.target.value) as CheckboxConfig['size'] })} />
      </div>
    </>
  ),
  RenderItem: ({ config }) => (
    <div className="form-check">
      <input type="checkbox" className="form-check-input" id={config.id} name={config.name} />
      <label className="form-check-label" htmlFor={config.id}>{config.label_text}</label>
    </div>
  ),
};

// ─── Header ───────────────────────────────────────────────────────────────────

interface HeaderConfig extends BaseItemConfig { _type: 'header'; text: string; level: 'h1' | 'h2' | 'h3' }

export const headerDef: FormItemDefinition<HeaderConfig> = {
  type: 'header',
  icon: 'type-h1',
  label: 'Заголовок',
  defaultConfig: {
    _type: 'header',
    size: 12,
    text: 'Заголовок',
    level: 'h2',
  },
  BuilderItem: ({ config }) => {
    const Tag = config.level;
    return <div className="p-2"><Tag>{config.text}</Tag></div>;
  },
  ConfigPanel: ({ config, onChange }) => (
    <>
      <div>
        <label className="form-label small mb-1">Текст</label>
        <input className="form-control form-control-sm" value={config.text} onChange={(e) => onChange({ text: e.target.value })} />
      </div>
      <div>
        <label className="form-label small mb-1">Уровень</label>
        <select className="form-select form-select-sm" value={config.level} onChange={(e) => onChange({ level: e.target.value as HeaderConfig['level'] })}>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>
      </div>
      <div>
        <label className="form-label small mb-1">Ширина (1–12)</label>
        <input type="number" className="form-control form-control-sm" min={1} max={12} value={config.size} onChange={(e) => onChange({ size: Number(e.target.value) as HeaderConfig['size'] })} />
      </div>
    </>
  ),
  RenderItem: ({ config }) => {
    const Tag = config.level;
    return <Tag>{config.text}</Tag>;
  },
};

// ─── HR ───────────────────────────────────────────────────────────────────────

export const hrDef: FormItemDefinition<BaseItemConfig & { _type: 'hr' }> = {
  type: 'hr',
  icon: 'dash',
  label: 'Разделитель',
  defaultConfig: { _type: 'hr', size: 12 },
  BuilderItem: () => <div className="p-2"><hr className="my-1" /></div>,
  ConfigPanel: ({ config, onChange }) => (
    <div>
      <label className="form-label small mb-1">Ширина (1–12)</label>
      <input type="number" className="form-control form-control-sm" min={1} max={12} value={config.size} onChange={(e) => onChange({ size: Number(e.target.value) as BaseItemConfig['size'] })} />
    </div>
  ),
  RenderItem: () => <hr />,
};

// ─── Registry ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allItemDefinitions: FormItemDefinition<any>[] = [
  headerDef,
  textInputDef,
  numberInputDef,
  textareaDef,
  selectDef,
  checkboxDef,
  hrDef,
];
