// pages/dashboard.tsx
import { useState, useEffect } from 'react';
import TableSelector from '../components/TableSelector';
import DataForm from '../components/DataForm';
import DataTable from '../components/DataTable';
import FunctionCall from '../components/FunctionCall';

export default function Dashboard() {
  const [selectedTable, setSelectedTable] = useState('');
  const [dataList, setDataList] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const tables = ['Customer', 'Product', 'Order', 'OrderDetail'];

  const fetchData = async () => {
    const res = await fetch('/api/' + selectedTable + '/getAll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: selectedTable }),
    });
    const data = await res.json();
    setDataList(data);
    setFields(data.length > 0 ? Object.keys(data[0]) : []);
  };

  useEffect(() => {
    if (selectedTable) {
      fetchData();
    }
  }, [selectedTable]);

  const handleCreateOrUpdate = async (formData: any) => {
    const method = editing ? 'PUT' : 'POST';
    const api = editing ? 'update' : 'create';

    await fetch(`/api/${selectedTable}/${api}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: selectedTable, data: formData }),
    });

    setEditing(null);
    fetchData();
  };

  const handleDelete = async (id: any) => {
    await fetch(`/api/${selectedTable}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: selectedTable, id }),
    });
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard – Quản lý dữ liệu</h1>
      <TableSelector tables={tables} selectedTable={selectedTable} onSelect={setSelectedTable} />

      {selectedTable && (
        <>
          <h2 className="font-semibold mb-2">Form {editing ? 'Cập nhật' : 'Thêm'} dữ liệu</h2>
          <DataForm fields={fields} initialData={editing || {}} onSubmit={handleCreateOrUpdate} />

          <h2 className="font-semibold mt-6">Danh sách dữ liệu</h2>
          <DataTable data={dataList} onEdit={setEditing} onDelete={handleDelete} />
        </>
      )}

      <FunctionCall functionName="TinhTongDoanhThu" paramNames={['Nam']} />
    </div>
  );
}
