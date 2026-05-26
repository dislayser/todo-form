import React from 'react';
import type { FormItemDefinition, BaseItemConfig, InputItemConfig, FieldSize, GridSize } from '../types/FormItem';
import {
  Txt, Num, Chk, Sel, SizeField, OptionsArea,
  InputConfig, FieldLabel, fieldSizeClass, bsColors,
} from './shared';

// ─── Config type declarations ─────────────────────────────────────────────────

interface TextConfig extends InputItemConfig { _type: 'text'; maxlength: number | null; value: string }
interface NumberConfig extends InputItemConfig { _type: 'number'; value: string; min: number | null; max: number | null; step: number | null }
interface TextareaConfig extends InputItemConfig { _type: 'textarea'; rows: number; maxlength: number | null; value: string }
interface PasswordConfig extends InputItemConfig { _type: 'password'; maxlength: number | null; value: string }
interface DateConfig extends InputItemConfig { _type: 'date'; min: string | null; max: string | null; step: string | null; value: string }
interface DateTimeConfig extends InputItemConfig { _type: 'datetime'; min: string | null; max: string | null; step: string | null; value: string }
interface FileConfig extends InputItemConfig { _type: 'file'; accept: string }
interface SelectConfig extends InputItemConfig { _type: 'select'; options: string[]; value: string }
interface DatalistConfig extends InputItemConfig { _type: 'datalist'; options: string[]; maxlength: number | null; value: string }
interface CheckboxConfig extends BaseItemConfig { _type: 'checkbox'; name: string; id: string; label_text: string; required: boolean; disabled: boolean; value: boolean }
interface HiddenConfig extends BaseItemConfig { _type: 'hidden'; name: string; id: string; value: string }
interface HeaderConfig extends BaseItemConfig { _type: 'header'; text: string; level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; color: string; align: 'start' | 'center' | 'end' }
interface ParagraphConfig extends BaseItemConfig { _type: 'paragraph'; text: string; align: 'start' | 'center' | 'end' | 'justify'; color: string }
interface ButtonConfig extends BaseItemConfig { _type: 'button'; text: string; buttonType: 'button' | 'submit' | 'reset'; color: string; id: string; name: string; wide: boolean; btnSize: 0 | 1 | 2; disabled: boolean; tooltip: string | null }
type HrConfig = BaseItemConfig & { _type: 'hr' }
interface DivConfig extends BaseItemConfig { _type: 'div'; id: string }
interface PartConfig extends BaseItemConfig { _type: 'part'; id: string; formrender: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseOptions(options: string[]): { value: string; label: string }[] {
  return options
    .filter((o) => o.trim())
    .map((o) => {
      const [v, l] = o.split('::', 2);
      return { value: v.trim(), label: (l ?? v).trim() };
    });
}

const alignOpts = [
  { value: 'start', label: 'Слева' },
  { value: 'center', label: 'По центру' },
  { value: 'end', label: 'Справа' },
  { value: 'justify', label: 'По ширине' },
];

const btnTypeOpts = [
  { value: 'button', label: 'button' },
  { value: 'submit', label: 'submit' },
  { value: 'reset', label: 'reset' },
];

const levelOpts = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((v) => ({ value: v, label: v.toUpperCase() }));

// ─── TEXT ─────────────────────────────────────────────────────────────────────

export const textDef: FormItemDefinition<TextConfig> = {
  type: 'text',
  icon: 'input-cursor',
  label: 'Текстовое поле',
  defaultConfig: { _type: 'text', size: 6, id: '', name: '', label_text: 'Текстовое поле', placeholder: 'Введите текст', required: false, disabled: false, field_size: 0, maxlength: null, value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input className={fieldSizeClass(config.field_size)} placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<Num label="Макс. длина" value={config.maxlength} onChange={(v) => onChange({ maxlength: v })} />}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        type="text"
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        placeholder={config.placeholder}
        maxLength={config.maxlength ?? undefined}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── NUMBER ───────────────────────────────────────────────────────────────────

export const numberDef: FormItemDefinition<NumberConfig> = {
  type: 'number',
  icon: '123',
  label: 'Число',
  defaultConfig: { _type: 'number', size: 6, id: '', name: '', label_text: 'Числовое поле', placeholder: '0', required: false, disabled: false, field_size: 0, value: '', min: null, max: null, step: null },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input type="number" className={fieldSizeClass(config.field_size)} placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<>
        <Num label="Min" value={config.min} onChange={(v) => onChange({ min: v })} />
        <Num label="Max" value={config.max} onChange={(v) => onChange({ max: v })} />
        <Num label="Step" value={config.step} onChange={(v) => onChange({ step: v })} />
      </>}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        type="number"
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        placeholder={config.placeholder}
        min={config.min ?? undefined} max={config.max ?? undefined} step={config.step ?? undefined}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── TEXTAREA ─────────────────────────────────────────────────────────────────

export const textareaDef: FormItemDefinition<TextareaConfig> = {
  type: 'textarea',
  icon: 'textarea-resize',
  label: 'Большое поле',
  defaultConfig: { _type: 'textarea', size: 12, id: '', name: '', label_text: 'Большое поле', placeholder: 'Введите текст', required: false, disabled: false, field_size: 0, rows: 3, maxlength: null, value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <textarea className={fieldSizeClass(config.field_size)} rows={config.rows} placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<>
        <Num label="Строк" value={config.rows} onChange={(v) => onChange({ rows: v ?? 3 })} min={1} />
        <Num label="Макс. длина" value={config.maxlength} onChange={(v) => onChange({ maxlength: v })} />
      </>}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <textarea
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        placeholder={config.placeholder}
        rows={config.rows}
        maxLength={config.maxlength ?? undefined}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── PASSWORD ─────────────────────────────────────────────────────────────────

export const passwordDef: FormItemDefinition<PasswordConfig> = {
  type: 'password',
  icon: 'key',
  label: 'Пароль',
  defaultConfig: { _type: 'password', size: 6, id: '', name: '', label_text: 'Пароль', placeholder: '••••••••', required: false, disabled: false, field_size: 0, maxlength: null, value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input type="password" className={fieldSizeClass(config.field_size)} placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<Num label="Макс. длина" value={config.maxlength} onChange={(v) => onChange({ maxlength: v })} />}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        type="password"
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        placeholder={config.placeholder}
        maxLength={config.maxlength ?? undefined}
        required={config.required} disabled={config.disabled}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── DATE ─────────────────────────────────────────────────────────────────────

export const dateDef: FormItemDefinition<DateConfig> = {
  type: 'date',
  icon: 'calendar-date',
  label: 'Дата',
  defaultConfig: { _type: 'date', size: 6, id: '', name: '', label_text: 'Дата', placeholder: '', required: false, disabled: false, field_size: 0, min: null, max: null, step: null, value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input type="date" className={fieldSizeClass(config.field_size)} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<>
        <Txt label="Min" value={config.min ?? ''} onChange={(v) => onChange({ min: v || null })} />
        <Txt label="Max" value={config.max ?? ''} onChange={(v) => onChange({ max: v || null })} />
        <Txt label="Step" value={config.step ?? ''} onChange={(v) => onChange({ step: v || null })} />
      </>}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        type="date"
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        min={config.min ?? undefined} max={config.max ?? undefined} step={config.step ?? undefined}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── DATETIME ─────────────────────────────────────────────────────────────────

export const datetimeDef: FormItemDefinition<DateTimeConfig> = {
  type: 'datetime',
  icon: 'clock',
  label: 'Дата и время',
  defaultConfig: { _type: 'datetime', size: 6, id: '', name: '', label_text: 'Дата и время', placeholder: '', required: false, disabled: false, field_size: 0, min: null, max: null, step: null, value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input type="datetime-local" className={fieldSizeClass(config.field_size)} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<>
        <Txt label="Min" value={config.min ?? ''} onChange={(v) => onChange({ min: v || null })} />
        <Txt label="Max" value={config.max ?? ''} onChange={(v) => onChange({ max: v || null })} />
        <Txt label="Step" value={config.step ?? ''} onChange={(v) => onChange({ step: v || null })} />
      </>}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        type="datetime-local"
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        min={config.min ?? undefined} max={config.max ?? undefined} step={config.step ?? undefined}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
    </div>
  ),
};

// ─── FILE ─────────────────────────────────────────────────────────────────────

export const fileDef: FormItemDefinition<FileConfig> = {
  type: 'file',
  icon: 'file-earmark',
  label: 'Файл',
  defaultConfig: { _type: 'file', size: 6, id: '', name: '', label_text: 'Файл', placeholder: '', required: false, disabled: false, field_size: 0, accept: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input type="file" className={fieldSizeClass(config.field_size)} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<Txt label="Accept (.jpg, .pdf, …)" value={config.accept} onChange={(v) => onChange({ accept: v })} />}
    />
  ),
  RenderItem: ({ config }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        type="file"
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        accept={config.accept || undefined}
        required={config.required} disabled={config.disabled}
      />
    </div>
  ),
};

// ─── SELECT ───────────────────────────────────────────────────────────────────

export const selectDef: FormItemDefinition<SelectConfig> = {
  type: 'select',
  icon: 'list-task',
  label: 'Список',
  defaultConfig: { _type: 'select', size: 6, id: '', name: '', label_text: 'Список', placeholder: '', required: false, disabled: false, field_size: 0, options: ['Вариант 1', 'Вариант 2', 'Вариант 3'], value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <select className={fieldSizeClass(config.field_size, 'select')} disabled>
        {parseOptions(config.options).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<OptionsArea value={config.options} onChange={(v) => onChange({ options: v })} />}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <select
        className={fieldSizeClass(config.field_size, 'select')}
        name={config.name} id={config.id}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      >
        {parseOptions(config.options).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  ),
};

// ─── DATALIST ─────────────────────────────────────────────────────────────────

export const datalistDef: FormItemDefinition<DatalistConfig> = {
  type: 'datalist',
  icon: 'ui-radios',
  label: 'Даталист',
  defaultConfig: { _type: 'datalist', size: 6, id: 'dl', name: '', label_text: 'Даталист', placeholder: 'Введите или выберите', required: false, disabled: false, field_size: 0, options: ['Вариант 1', 'Вариант 2'], maxlength: null, value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <FieldLabel text={config.label_text || 'Подпись'} required={config.required} />
      <input list={config.id} className={fieldSizeClass(config.field_size)} placeholder={config.placeholder} disabled />
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <InputConfig config={config} onChange={onChange}
      extra={<>
        <Num label="Макс. длина" value={config.maxlength} onChange={(v) => onChange({ maxlength: v })} />
        <OptionsArea value={config.options} onChange={(v) => onChange({ options: v })} />
      </>}
    />
  ),
  RenderItem: ({ config, onChange }) => (
    <div>
      <FieldLabel text={config.label_text} required={config.required} />
      <input
        list={`dl-${config.id}`}
        className={fieldSizeClass(config.field_size)}
        name={config.name} id={config.id}
        placeholder={config.placeholder}
        maxLength={config.maxlength ?? undefined}
        required={config.required} disabled={config.disabled}
        defaultValue={config.value}
        onChange={(e) => onChange?.(config.name, e.target.value)}
      />
      <datalist id={`dl-${config.id}`}>
        {parseOptions(config.options).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </datalist>
    </div>
  ),
};

// ─── CHECKBOX ─────────────────────────────────────────────────────────────────

export const checkboxDef: FormItemDefinition<CheckboxConfig> = {
  type: 'checkbox',
  icon: 'check-square',
  label: 'Галочка',
  defaultConfig: { _type: 'checkbox', size: 6, id: '', name: '', label_text: 'Галочка', required: false, disabled: false, value: false },
  BuilderItem: ({ config }) => (
    <div className="p-2 d-flex align-items-center">
      <div className="form-check mb-0">
        <input type="checkbox" className="form-check-input" defaultChecked={config.value} disabled />
        <label className="form-check-label">
          {config.label_text}
          {config.required && <span className="text-danger ms-1">*</span>}
        </label>
      </div>
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <>
      <Txt label="Подпись" value={config.label_text} onChange={(v) => onChange({ label_text: v })} />
      <Txt label="Name" value={config.name} onChange={(v) => onChange({ name: v })} />
      <Txt label="ID" value={config.id} onChange={(v) => onChange({ id: v })} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
      <Chk label="По умолчанию включено" checked={config.value} onChange={(v) => onChange({ value: v })} />
      <Chk label="Обязательное" checked={config.required} onChange={(v) => onChange({ required: v })} />
      <Chk label="Выключено" checked={config.disabled} onChange={(v) => onChange({ disabled: v })} />
    </>
  ),
  RenderItem: ({ config }) => (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={config.id} name={config.name}
        defaultChecked={config.value}
        required={config.required} disabled={config.disabled}
      />
      <label className="form-check-label" htmlFor={config.id}>
        {config.label_text}
        {config.required && <span className="text-danger ms-1">*</span>}
      </label>
    </div>
  ),
};

// ─── HIDDEN ───────────────────────────────────────────────────────────────────

export const hiddenDef: FormItemDefinition<HiddenConfig> = {
  type: 'hidden',
  icon: 'dash-square-dotted',
  label: 'Скрытое поле',
  noWrapper: true,
  defaultConfig: { _type: 'hidden', size: 12, id: '', name: '', value: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2 d-flex align-items-center gap-2 text-muted small">
      <i className="bi bi-dash-square-dotted" />
      <span>hidden: <code>{config.name || '—'}</code></span>
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <>
      <Txt label="Name" value={config.name} onChange={(v) => onChange({ name: v })} />
      <Txt label="ID" value={config.id} onChange={(v) => onChange({ id: v })} />
      <Txt label="Значение" value={config.value} onChange={(v) => onChange({ value: v })} />
    </>
  ),
  RenderItem: ({ config }) => (
    <input type="hidden" name={config.name} id={config.id} value={config.value} />
  ),
};

// ─── HEADER ───────────────────────────────────────────────────────────────────

export const headerDef: FormItemDefinition<HeaderConfig> = {
  type: 'header',
  icon: 'type-h1',
  label: 'Заголовок',
  defaultConfig: { _type: 'header', size: 12, text: 'Заголовок', level: 'h2', color: '', align: 'start' },
  BuilderItem: ({ config }) => {
    const Tag = config.level;
    const cls = [config.color ? `text-${config.color}` : '', `text-${config.align}`].filter(Boolean).join(' ');
    return (
      <div className="p-2">
        <Tag className={cls}>{config.text}</Tag>
      </div>
    );
  },
  ConfigPanel: ({ config, onChange }) => (
    <>
      <Txt label="Текст" value={config.text} onChange={(v) => onChange({ text: v })} />
      <Sel label="Уровень" value={config.level} options={levelOpts} onChange={(v) => onChange({ level: v as HeaderConfig['level'] })} />
      <Sel label="Выравнивание" value={config.align} options={alignOpts.filter(o => o.value !== 'justify')} onChange={(v) => onChange({ align: v as HeaderConfig['align'] })} />
      <Sel label="Цвет" value={config.color} options={bsColors} onChange={(v) => onChange({ color: v })} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
    </>
  ),
  RenderItem: ({ config }) => {
    const Tag = config.level;
    const cls = [config.color ? `text-${config.color}` : '', `text-${config.align}`].filter(Boolean).join(' ');
    return <Tag className={cls}>{config.text}</Tag>;
  },
};

// ─── PARAGRAPH ────────────────────────────────────────────────────────────────

export const paragraphDef: FormItemDefinition<ParagraphConfig> = {
  type: 'paragraph',
  icon: 'fonts',
  label: 'Параграф',
  defaultConfig: { _type: 'paragraph', size: 12, text: 'Текст параграфа', align: 'start', color: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2">
      <p className={`mb-0 text-${config.align}${config.color ? ` text-${config.color}` : ''}`}>{config.text}</p>
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <>
      <div>
        <label className="form-label small mb-1">Текст</label>
        <textarea
          className="form-control form-control-sm"
          rows={3}
          value={config.text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      </div>
      <Sel label="Выравнивание" value={config.align} options={alignOpts} onChange={(v) => onChange({ align: v as ParagraphConfig['align'] })} />
      <Sel label="Цвет" value={config.color} options={bsColors} onChange={(v) => onChange({ color: v })} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
    </>
  ),
  RenderItem: ({ config }) => (
    <p className={`text-${config.align}${config.color ? ` text-${config.color}` : ''}`}>{config.text}</p>
  ),
};

// ─── BUTTON ───────────────────────────────────────────────────────────────────

export const buttonDef: FormItemDefinition<ButtonConfig> = {
  type: 'button',
  icon: 'app',
  label: 'Кнопка',
  defaultConfig: { _type: 'button', size: 12, text: 'Кнопка', buttonType: 'button', color: 'primary', id: '', name: '', wide: false, btnSize: 0, disabled: false, tooltip: null },
  BuilderItem: ({ config }) => {
    const btnSizeCls = config.btnSize === 1 ? ' btn-sm' : config.btnSize === 2 ? ' btn-lg' : '';
    const cls = `btn btn-${config.color || 'primary'}${btnSizeCls}${config.wide ? ' w-100' : ''}`;
    return (
      <div className="p-2">
        <button type="button" className={cls} title={config.tooltip ?? undefined} disabled>
          {config.text}
        </button>
      </div>
    );
  },
  ConfigPanel: ({ config, onChange }) => (
    <>
      <Txt label="Текст" value={config.text} onChange={(v) => onChange({ text: v })} />
      <Sel label="Тип" value={config.buttonType} options={btnTypeOpts} onChange={(v) => onChange({ buttonType: v as ButtonConfig['buttonType'] })} />
      <Sel label="Цвет" value={config.color} options={bsColors.filter((c) => c.value)} onChange={(v) => onChange({ color: v })} />
      <Sel label="Размер" value={config.btnSize} options={[{ value: 0, label: 'Обычный' }, { value: 1, label: 'Малый' }, { value: 2, label: 'Большой' }]} onChange={(v) => onChange({ btnSize: Number(v) as ButtonConfig['btnSize'] })} />
      <Chk label="На всю ширину" checked={config.wide} onChange={(v) => onChange({ wide: v })} />
      <Chk label="Выключено" checked={config.disabled} onChange={(v) => onChange({ disabled: v })} />
      <Txt label="Подсказка (tooltip)" value={config.tooltip ?? ''} onChange={(v) => onChange({ tooltip: v || null })} />
      <Txt label="Name" value={config.name} onChange={(v) => onChange({ name: v })} />
      <Txt label="ID" value={config.id} onChange={(v) => onChange({ id: v })} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
    </>
  ),
  RenderItem: ({ config }) => {
    const btnSizeCls = config.btnSize === 1 ? ' btn-sm' : config.btnSize === 2 ? ' btn-lg' : '';
    const cls = `btn btn-${config.color || 'primary'}${btnSizeCls}${config.wide ? ' w-100' : ''}`;
    return (
      <button type={config.buttonType} id={config.id} name={config.name} className={cls} disabled={config.disabled} title={config.tooltip ?? undefined}>
        {config.text}
      </button>
    );
  },
};

// ─── HR ───────────────────────────────────────────────────────────────────────

export const hrDef: FormItemDefinition<HrConfig> = {
  type: 'hr',
  icon: 'dash',
  label: 'Разделитель',
  defaultConfig: { _type: 'hr', size: 12 },
  BuilderItem: () => <div className="p-2"><hr className="my-1" /></div>,
  ConfigPanel: ({ config, onChange }) => (
    <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
  ),
  RenderItem: () => <hr />,
};

// ─── DIV ──────────────────────────────────────────────────────────────────────

export const divDef: FormItemDefinition<DivConfig> = {
  type: 'div',
  icon: 'border',
  label: 'Блок (div)',
  defaultConfig: { _type: 'div', size: 12, id: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2 border border-dashed rounded text-muted small text-center">
      div{config.id ? `#${config.id}` : ''}
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <>
      <Txt label="ID" value={config.id} onChange={(v) => onChange({ id: v })} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
    </>
  ),
  RenderItem: ({ config }) => <div id={config.id} />,
};

// ─── PART ─────────────────────────────────────────────────────────────────────

export const partDef: FormItemDefinition<PartConfig> = {
  type: 'part',
  icon: 'layout-split',
  label: 'Часть формы',
  defaultConfig: { _type: 'part', size: 12, id: '', formrender: '' },
  BuilderItem: ({ config }) => (
    <div className="p-2 border border-dashed rounded text-muted small text-center">
      <i className="bi bi-layout-split me-1" />
      FormRender{config.formrender ? ` #${config.formrender}` : ''}
    </div>
  ),
  ConfigPanel: ({ config, onChange }) => (
    <>
      <Txt label="ID" value={config.id} onChange={(v) => onChange({ id: v })} />
      <Txt label="Form ID (formrender)" value={config.formrender} onChange={(v) => onChange({ formrender: v })} />
      <SizeField value={config.size} onChange={(v) => onChange({ size: v })} />
    </>
  ),
  RenderItem: ({ config }) => (
    <div id={config.id} data-formrender={config.formrender} />
  ),
};

// ─── Registry ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allItemDefinitions: FormItemDefinition<any>[] = [
  headerDef,
  paragraphDef,
  textDef,
  numberDef,
  passwordDef,
  textareaDef,
  selectDef,
  datalistDef,
  checkboxDef,
  dateDef,
  datetimeDef,
  fileDef,
  hiddenDef,
  buttonDef,
  hrDef,
  divDef,
  partDef,
];
