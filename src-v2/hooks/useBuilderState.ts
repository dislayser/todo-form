import { useReducer, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { BaseItemConfig } from '../types/FormItem';

type State = {
  items: BaseItemConfig[];
  selectedId: string | null;
};

type Action =
  | { type: 'ADD_ITEM'; config: Omit<BaseItemConfig, '_uid'> }
  | { type: 'REMOVE_ITEM'; uid: string }
  | { type: 'DUPLICATE_ITEM'; uid: string }
  | { type: 'REORDER'; oldIndex: number; newIndex: number }
  | { type: 'SELECT'; uid: string | null }
  | { type: 'UPDATE'; uid: string; patch: Partial<BaseItemConfig> }
  | { type: 'SET_ALL'; items: BaseItemConfig[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, { ...action.config, _uid: crypto.randomUUID() }],
      };
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item._uid !== action.uid),
        selectedId: state.selectedId === action.uid ? null : state.selectedId,
      };
    case 'DUPLICATE_ITEM': {
      const idx = state.items.findIndex(i => i._uid === action.uid);
      if (idx === -1) return state;
      const copy = { ...state.items[idx], _uid: crypto.randomUUID() };
      const items = [...state.items];
      items.splice(idx + 1, 0, copy);
      return { ...state, items };
    }
    case 'REORDER':
      return {
        ...state,
        items: arrayMove(state.items, action.oldIndex, action.newIndex),
      };
    case 'SELECT':
      return { ...state, selectedId: action.uid };
    case 'UPDATE':
      return {
        ...state,
        items: state.items.map(item =>
          item._uid === action.uid ? { ...item, ...action.patch } : item
        ),
      };
    case 'SET_ALL':
      return { items: action.items, selectedId: null };
  }
}

const initialState: State = { items: [], selectedId: null };

export function useBuilderState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    items: state.items,
    selectedId: state.selectedId,
    addItem: useCallback(
      (config: Omit<BaseItemConfig, '_uid'>) => dispatch({ type: 'ADD_ITEM', config }),
      []
    ),
    removeItem: useCallback(
      (uid: string) => dispatch({ type: 'REMOVE_ITEM', uid }),
      []
    ),
    reorderItems: useCallback(
      (oldIndex: number, newIndex: number) => dispatch({ type: 'REORDER', oldIndex, newIndex }),
      []
    ),
    selectItem: useCallback(
      (uid: string | null) => dispatch({ type: 'SELECT', uid }),
      []
    ),
    updateItem: useCallback(
      (uid: string, patch: Partial<BaseItemConfig>) => dispatch({ type: 'UPDATE', uid, patch }),
      []
    ),
    setAllItems: useCallback(
      (items: BaseItemConfig[]) => dispatch({ type: 'SET_ALL', items }),
      []
    ),
    duplicateItem: useCallback(
      (uid: string) => dispatch({ type: 'DUPLICATE_ITEM', uid }),
      []
    ),
  };
}
