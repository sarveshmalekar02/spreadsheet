"use client"

import React, { useState } from 'react';
import SpreadsheetGrid from '../components/SpreadsheetGrid';
import Toolbar from '../components/Toolbar';
import Pagination from '../components/Pagination';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20; // Number of rows per page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <Toolbar />
      <SpreadsheetGrid currentPage={currentPage} rowsPerPage={rowsPerPage} />
      <Pagination
        totalRows={1000} // total rows according to our dataset
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
