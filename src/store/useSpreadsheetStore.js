import create from 'zustand';

const useSpreadsheetStore = create((set) => ({
  cells: {}, // Cell content storage
  cellStyles: {}, // Cell styling storage
  history: [], // History for undo/redo
  future: [], // Future states for redo
  selectedCell: null, // Currently selected cell
  searchQuery: '', // for searching cells

  updateCell: (key, value) =>
    set((state) => {
      const newCells = { ...state.cells, [key]: value };
      return {
        cells: newCells,
        history: [...state.history, { cells: state.cells, cellStyles: state.cellStyles }],
        future: [],
      };
    }),

  updateCellStyle: (key, style) =>
    set((state) => {
      const newStyles = { ...state.cellStyles, [key]: { ...state.cellStyles[key], ...style } };
      return {
        cellStyles: newStyles,
        history: [...state.history, { cells: state.cells, cellStyles: state.cellStyles }],
        future: [],
      };
    }),

  selectCell: (key) => set(() => ({ selectedCell: key })),

  setSearchQuery: (query) => set(() => ({ searchQuery: query })),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;
      const lastState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return {
        cells: lastState.cells,
        cellStyles: lastState.cellStyles,
        history: newHistory,
        future: [{ cells: state.cells, cellStyles: state.cellStyles }, ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const nextState = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        cells: nextState.cells,
        cellStyles: nextState.cellStyles,
        history: [...state.history, { cells: state.cells, cellStyles: state.cellStyles }],
        future: newFuture,
      };
    }),
}));

export default useSpreadsheetStore;
