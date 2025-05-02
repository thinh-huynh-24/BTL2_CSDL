import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><Link href="/" className="block hover:text-blue-600">Trang chủ</Link></li>
        <li><Link href="/donhang" className="block hover:text-blue-600">Danh sách đơn hàng</Link></li>
        <li><Link href="/donhang/form" className="block hover:text-blue-600">Thêm/Sửa đơn hàng</Link></li>
        <li><Link href="/donhang/tong-gia-tri" className="block hover:text-blue-600">Tính tổng đơn hàng</Link></li>
      </ul>
    </div>
  );
}
