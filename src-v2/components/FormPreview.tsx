import { useState } from 'react';
import type { BaseItemConfig, FormItemDefinition } from '../types/FormItem';

interface Props {
  items: BaseItemConfig[];
  itemDefinitions: FormItemDefinition[];
  onClose: () => void;
}

export function FormPreview({ items, itemDefinitions, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <>
      <div
        className="modal-backdrop show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />
      <div className="modal show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4">

            <div className="modal-header border-0 pb-2">
              <div className="d-flex align-items-center gap-2">
                <span className="badge text-bg-success p-2 rounded-3">
                  <i className="bi bi-eye fs-5" />
                </span>
                <div>
                  <h5 className="modal-title mb-0">Предпросмотр</h5>
                  <div className="text-body-secondary" style={{ fontSize: '0.75rem' }}>
                    {items.length} {items.length === 1 ? 'элемент' : 'элементов'}
                  </div>
                </div>
              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <hr className="my-0 opacity-25" />

            <div className="modal-body px-4 py-4">
              {items.length === 0 ? (
                <div className="text-center text-body-secondary py-5">
                  <i className="bi bi-layout-wtf fs-1 d-block mb-3 opacity-25" />
                  <p className="mb-0">Форма пустая — добавьте элементы в редакторе</p>
                </div>
              ) : (
                <form className="row g-3" onSubmit={handleSubmit}>
                  {items.map((item) => {
                    const def = itemDefinitions.find((d) => d.type === item._type);
                    if (!def) return null;
                    if (def.noWrapper) {
                      return <def.RenderItem key={item._uid} config={item as never} />;
                    }
                    return (
                      <div key={item._uid} className={`col-md-${item.size}`}>
                        <def.RenderItem config={item as never} />
                      </div>
                    );
                  })}

                  {submitted && (
                    <div className="col-12">
                      <div className="alert alert-success d-flex align-items-center gap-2 py-2 mb-0 rounded-3">
                        <i className="bi bi-check-circle-fill" />
                        Форма успешно отправлена!
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>
                Закрыть
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
