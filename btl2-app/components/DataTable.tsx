// components/DataTable.tsx
import React from 'react';

interface DataTableProps {
  data: Record<string, any>[];
  onEdit: (row: Record<string, any>) => void;
  onDelete: (id: any) => void;
}

export default function DataTable({ data, onEdit, onDelete }: DataTableProps) {
  if (data.length === 0) return <p>Không có dữ liệu.</p>;

  const headers = Object.keys(data[0]);

  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-200">
        <tr>
          {headers.map((key) => (
            <th key={key} className="p-2 border">
              {key}
            </th>
          ))}
          <th className="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-100">
            {headers.map((key) => (
              <td key={key} className="p-2 border">
                {row[key]}
              </td>
            ))}
            <td className="p-2 border">
              <button onClick={() => onEdit(row)} className="text-blue-600 mr-2">Sửa</button>
              <button onClick={() => onDelete(row.Id)} className="text-red-600">Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
