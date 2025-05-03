# Hệ thống Quản lý Đơn hàng Shopee

## 1. Giới thiệu

Đây là hệ thống quản lý đơn hàng Shopee gồm:

- **Cơ sở dữ liệu SQL Server** (thư mục `sql`)
- **Frontend** Next.js (thư mục `shopee-frontend`)
- **API backend** (nếu có, ví dụ Node.js/Express)

## 2. Yêu cầu hệ thống

- **SQL Server** (hoặc SQL Server Express)
- **Node.js** >= 16.x
- **npm** hoặc **yarn**

## 3. Cài đặt và khởi tạo CSDL

### 3.1. Tạo cơ sở dữ liệu và các bảng

1. Mở SQL Server Management Studio (SSMS) hoặc Azure Data Studio.
2. Chạy file sau để tạo database và các bảng:
   - `sql/create_table.sql`

### 3.2. Nhập dữ liệu mẫu

- Chạy tiếp file:
  - `sql/exp_data.sql` hoặc `sql/inital_data.sql`

### 3.3. Tạo các hàm, thủ tục

- Chạy các file trong thư mục:
  - `sql/functions/`
  - `sql/procedures/`

> **Lưu ý:** Nên chạy theo thứ tự: tạo bảng → nhập dữ liệu → tạo hàm/thủ tục.

## 4. Cài đặt và chạy frontend

```bash
cd shopee-frontend
npm install
npm run dev
```

- Truy cập [http://localhost:3000](http://localhost:3000)

## 5. Kết nối backend/API (nếu có)

- Đảm bảo file cấu hình kết nối CSDL đúng (ví dụ: `.env` hoặc `config.js`).
- Nếu có backend riêng, chạy:
  ```bash
  cd backend
  npm install
  npm run dev
  ```

## 6. Sử dụng hệ thống

- Đăng nhập/truy cập giao diện web để quản lý đơn hàng, khách hàng, sản phẩm, v.v.
- Có thể sử dụng các hàm/thủ tục SQL trực tiếp trên SSMS để kiểm thử.

## 7. Ghi chú

- Nếu gặp lỗi thiếu dữ liệu, hãy kiểm tra lại các bước nhập dữ liệu mẫu.
- Đảm bảo SQL Server đang chạy và cho phép kết nối từ ứng dụng.
