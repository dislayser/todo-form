import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormBuilder } from './components/FormBuilder';
import { allItemDefinitions } from './items/allItems';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="container-fluid px-3 pt-3 pb-5">
      <FormBuilder itemDefinitions={allItemDefinitions} />
    </div>
  </React.StrictMode>
);
