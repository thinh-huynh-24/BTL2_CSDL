import { useState } from 'react';

export default function DonHangForm() {
  const [form, setForm] = useState({
    ma_don_hang: '',
    ma_khach_hang: '',
    trang_thai: '',
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/donhang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(res.ok ? 'Thêm thành công!' : data.message || 'Thêm thất bại.');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert('Lỗi kết nối!');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thêm đơn hàng</h2>
      <div className="space-y-4 max-w-sm">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Mã đơn hàng"
          value={form.ma_don_hang}
          onChange={(e) => setForm({ ...form, ma_don_hang: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Mã khách hàng"
          value={form.ma_khach_hang}
          onChange={(e) => setForm({ ...form, ma_khach_hang: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Trạng thái"
          value={form.trang_thai}
          onChange={(e) => setForm({ ...form, trang_thai: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Thêm đơn hàng
        </button>
      </div>
    </div>
  );
}
