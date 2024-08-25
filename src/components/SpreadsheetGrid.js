import React from 'react';
import useSpreadsheetStore from '../store/useSpreadsheetStore';

const SpreadsheetGrid = () => {
  const rows = 20; // Number of rows
  const cols = 50; // Number of columns
  const { cells, cellStyles, updateCell, selectCell, searchQuery } = useSpreadsheetStore();

  const handleInputChange = (key, value) => {
    if (validateInput(key, value)) {
      updateCell(key, value);
    } else {
      alert('Invalid input!');
    }
  };

  const validateInput = (key, value) => {
    // Only numeric values in the first column is allowed
    if (key.endsWith('-0') && isNaN(value)) {
      return false;
    }
    return true;
  };

  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const key = `${i}-${j}`;
      const styles = cellStyles[key] || {};
      const value = cells[key] || '';
      

      if (searchQuery && !value.includes(searchQuery)) {
        continue;
      }

      row.push(
        <div
          key={key}
          className="border border-gray-300 w-40 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
          onClick={() => selectCell(key)}
          style={styles}
        >
          <input
            className="w-full h-full text-center p-2 bg-transparent focus:outline-none"
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            style={{ textAlign: styles.textAlign || 'left' }} 
          />
        </div>
      );
    }
    grid.push(<div key={i} className="flex">{row}</div>);
  }

  return (
    <div className="overflow-auto max-w-full max-h-[600px] shadow-lg border rounded-md p-4 bg-white">
      <div className="min-w-max">{grid}</div>
    </div>
  );
};

export default SpreadsheetGrid;
