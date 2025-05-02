import { useState, useEffect } from 'react';

export default function DonHangTable() {
  const [donHangs, setDonHangs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/donhang')
      .then((res) => res.json())
      .then((data) => setDonHangs(data.data || []));
  }, []);

  const filtered = donHangs.filter(dh =>
    dh.ma_don_hang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
      <input
        type="text"
        placeholder="Tìm kiếm mã đơn hàng"
        className="border px-2 py-1 mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã đơn hàng</th>
            <th className="border p-2">Khách hàng</th>
            <th className="border p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((dh) => (
            <tr key={dh.ma_don_hang}>
              <td className="border p-2">{dh.ma_don_hang}</td>
              <td className="border p-2">{dh.ma_khach_hang}</td>
              <td className="border p-2">{dh.trang_thai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
