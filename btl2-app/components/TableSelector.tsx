// components/TableSelector.tsx
import React from 'react';

interface TableSelectorProps {
  tables: string[];
  selectedTable: string;
  onSelect: (table: string) => void;
}

export default function TableSelector({ tables, selectedTable, onSelect }: TableSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Chọn bảng dữ liệu:</label>
      <select
        className="border rounded p-2 w-full"
        value={selectedTable}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Chọn bảng --</option>
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>
    </div>
  );
}
