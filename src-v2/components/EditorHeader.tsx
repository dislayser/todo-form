import { useState } from 'react';
import type { BaseItemConfig } from '../types/FormItem';
import { migrateSchema } from '../utils/migrateSchema';

interface Props {
  items: BaseItemConfig[];
  onSetAll: (items: BaseItemConfig[]) => void;
  onPreview: () => void;
}

export function EditorHeader({ items, onSetAll, onPreview }: Props) {
  const [jsonOpen, setJsonOpen] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState('');

  function openJson() {
    setJsonText(JSON.stringify(items, null, 2));
    setJsonError(null);
    setJsonOpen(true);
  }

  function copyJson() {
    navigator.clipboard.writeText(JSON.stringify(items, null, 2));
  }

  function importJson() {
    try {
      const parsed = JSON.parse(jsonText) as unknown[];
      onSetAll(migrateSchema(parsed));
      setJsonOpen(false);
    } catch {
      setJsonError('Невалидный JSON');
    }
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary border rounded-3 px-3 py-2 mb-3">
        <span className="navbar-brand mb-0 fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-grid-3x3-gap-fill text-primary fs-5" />
          <span>FormBuilder</span>
          <span className="badge text-bg-secondary fw-normal rounded-2" style={{ fontSize: '0.7rem' }}>v2</span>
        </span>

        <div className="d-flex align-items-center gap-2">
          {items.length > 0 && (
            <span className="badge text-bg-primary rounded-pill">
              {items.length} {items.length === 1 ? 'элемент' : 'элементов'}
            </span>
          )}
          <button
            type="button"
            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
            onClick={onPreview}
          >
            <i className="bi bi-eye" />
            <span>Render</span>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
            onClick={openJson}
          >
            <i className="bi bi-braces" />
            <span>JSON</span>
          </button>
        </div>
      </nav>

      {jsonOpen && (
        <>
          <div className="modal-backdrop show" style={{ zIndex: 1040 }} onClick={() => setJsonOpen(false)} />
          <div className="modal show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0 pb-0">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge text-bg-secondary p-2 rounded-3">
                      <i className="bi bi-braces fs-5" />
                    </span>
                    <h5 className="modal-title mb-0">Данные формы</h5>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setJsonOpen(false)} />
                </div>
                <div className="modal-body p-0 mt-3">
                  <textarea
                    className="form-control font-monospace border-0 rounded-0 bg-body-secondary"
                    rows={18}
                    value={jsonText}
                    spellCheck={false}
                    onChange={(e) => { setJsonText(e.target.value); setJsonError(null); }}
                  />
                  {jsonError && (
                    <div className="d-flex align-items-center gap-2 text-danger small px-3 pt-2">
                      <i className="bi bi-exclamation-circle" />
                      {jsonError}
                    </div>
                  )}
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 me-auto"
                    onClick={copyJson}
                  >
                    <i className="bi bi-copy" />
                    Копировать
                  </button>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setJsonOpen(false)}>
                    Закрыть
                  </button>
                  <button type="button" className="btn btn-sm btn-primary" onClick={importJson}>
                    Применить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
