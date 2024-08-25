"use client";

import React from 'react';
import useSpreadsheetStore from '../store/useSpreadsheetStore';

const Toolbar = () => {
  const { selectedCell, updateCellStyle, undo, redo, setSearchQuery } = useSpreadsheetStore();

  const handleAlignmentChange = (alignment) => {
    if (selectedCell) {
      updateCellStyle(selectedCell, { textAlign: alignment });
    }
  };

  const handleFontSizeChange = (size) => {
    if (selectedCell) {
      updateCellStyle(selectedCell, { fontSize: `${size}px` });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="toolbar flex flex-wrap space-x-4 mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <label htmlFor="search" className="font-medium">Search:</label>
        <input
          id="search"
          type="text"
          className="border p-1 rounded"
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="font-medium">Alignment:</label>
        <button
          className="border p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleAlignmentChange('left')}
        >
          Left
        </button>
        <button
          className="border p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleAlignmentChange('center')}
        >
          Center
        </button>
        <button
          className="border p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleAlignmentChange('right')}
        >
          Right
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="fontSize" className="font-medium">Font Size:</label>
        <input
          id="fontSize"
          type="number"
          className="border p-1 w-16 rounded"
          onChange={(e) => handleFontSizeChange(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <button className="border p-1 rounded bg-green-500 text-white hover:bg-green-600" onClick={undo}>
          Undo
        </button>
        <button className="border p-1 rounded bg-green-500 text-white hover:bg-green-600" onClick={redo}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
