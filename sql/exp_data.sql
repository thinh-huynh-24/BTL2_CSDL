USE SHOPPE
GO
-- =============================================
-- Thêm dữ liệu mẫu (đã sắp xếp lại thứ tự)
-- =============================================

-- Bảng loại sản phẩm (cần thêm trước bảng sản phẩm)
INSERT INTO loai_san_pham (ma_loai, ten_loai, mo_ta) VALUES
('L001', N'Điện tử', N'Các sản phẩm điện tử gia dụng'),
('L002', N'Thời trang', N'Quần áo, phụ kiện thời trang'),
('L003', N'Chăm sóc cá nhân', N'Mỹ phẩm, sản phẩm chăm sóc cơ thể'),
('L004', N'Nội thất', N'Đồ nội thất gia đình, văn phòng'),
('L005', N'Thực phẩm', N'Đồ ăn, thức uống'),
('L006', N'Dịch vụ ăn uống', N'Combo, suất ăn');

-- CÁ NHÂN
INSERT INTO ca_nhan (ma_ca_nhan, so_cccd, ho_va_ten) VALUES
('CN001', '001234567890', N'Nguyễn Văn A'),
('CN002', '001234567891', N'Trần Thị B'),
('CN003', '001234567892', N'Lê Văn C'),
('CN004', '001234567893', N'Phạm Thị D'),
('CN005', '001234567894', N'Hoàng Văn E'),
('CN006', '001234567895', N'Vũ Thị F'),
('CN007', '001234567896', N'Đặng Văn G'),
('CN008', '001234567897', N'Bùi Thị H');

-- CÔNG TY/DOANH NGHIỆP
INSERT INTO cong_ty_doanh_nghiep (ma_cong_ty, so_dang_ky_kinh_doanh, hinh_thuc_kinh_doanh, ten_cong_ty) VALUES
('CT001', '0312345678', N'Công ty TNHH một thành viên', N'Công ty TNHH ABC'),
('CT002', '0312345679', N'Công ty TNHH hai thành viên trở lên', N'Công ty TNHH XYZ'),
('CT003', '0312345680', N'Công ty cổ phần', N'Công ty CP Việt Tiến'),
('CT004', '0312345681', N'Công ty TNHH một thành viên', N'Công ty TNHH Sao Vàng'),  -- Điều chỉnh giá trị hợp lệ
('CT005', '0312345682', N'Công ty cổ phần', N'Công ty CP Thành Công'),
('CT006', '0312345683', N'Công ty TNHH một thành viên', N'Công ty TNHH Nam Bắc'),
('CT007', '0312345684', N'Doanh nghiệp tư nhân', N'Doanh nghiệp tư nhân Minh Quân'),
('CT008', '0312345685', N'Công ty hợp danh', N'Công ty Hợp Danh Phú Gia');

-- NGƯỜI BÁN
INSERT INTO nguoi_ban (ma_nguoi_ban, ten_cua_hang, email, so_dien_thoai) VALUES
('NB001', N'Cửa hàng Điện Máy Minh Phát', 'minhphat@shop.vn', '0901234567'),
('NB002', N'Cửa hàng Thời Trang Kim Anh', 'kimaluxury@shop.vn', '0912345678'),
('NB003', N'Siêu Thị Tiện Lợi An Khang', 'ankhangstore@gmail.com', '0934567890'),
('NB004', N'Cửa hàng Nội Thất Hòa Bình', 'hoabinhdecor@store.vn', '0987654321'),
('NB005', N'Tạp hóa Mai Lan', 'mailan123@taphoa.vn', '0923456789'),
('NB006', N'Cửa hàng Máy Tính Thanh Tùng', 'thanhtungpc@gmail.com', '0945678901'),
('NB007', N'Cửa hàng Điện Thoại Di Động 24h', 'mobile24h@dienmay.vn', '0967890123'),
('NB008', N'Quán Ăn Gia Đình Phúc Lộc', 'phuclocfood@quanan.vn', '0978901234');

-- NHÂN VIÊN (đã sửa lỗi chính tả "Hải Phòng")
INSERT INTO nhan_vien (ma_nhan_vien, ho_ten, so_cccd, ngay_sinh, que_quan, luong, dia_chi_tam_tru, email, so_dien_thoai) VALUES
('NV001', N'Nguyễn Văn Hùng', '001100112200', '1990-05-12', N'Hà Nội', 12000000.00, N'123 Lê Lợi, Q.1, TP.HCM', 'hungnv@company.vn', '0901234567'),
('NV002', N'Trần Thị Mai', '001100223311', '1992-08-25', N'Hải Phòng', 10000000.00, N'45 Hoàng Hoa Thám, TP.HCM', 'maitt@company.vn', '0912345678'),
('NV003', N'Phạm Minh Tuấn', '001100334422', '1988-11-30', N'Nam Định', 13500000.00, N'78 Trần Hưng Đạo, TP.HCM', 'tuanpm@company.vn', '0923456789'),
('NV004', N'Lê Thị Ngọc', '001100445533', '1995-03-18', N'Nghệ An', 9500000.00, N'12B Nguyễn Huệ, TP.HCM', 'ngocltn@company.vn', '0934567890'),
('NV005', N'Hoàng Văn Sơn', '001100556644', '1987-07-14', N'Thái Bình', 12500000.00, N'56B Lý Thường Kiệt, TP.HCM', 'sonhv@company.vn', '0945678901'),
('NV006', N'Vũ Thị Hoa', '001100667755', '1993-09-22', N'Hà Tĩnh', 9800000.00, N'34 Trường Chinh, TP.HCM', 'hoavt@company.vn', '0956789012'),
('NV007', N'Đặng Văn Quý', '001100778866', '1990-12-05', N'Quảng Ngãi', 11000000.00, N'67 Nguyễn Trãi, TP.HCM', 'quydv@company.vn', '0967890123'),
('NV008', N'Bùi Thị Hương', '001100889977', '1994-06-28', N'Tuyên Quang', 10500000.00, N'89 Phạm Văn Đồng, TP.HCM', 'huongbt@company.vn', '0978901234');

-- KHÁCH HÀNG (đã bổ sung tong_chi_tieu)
INSERT INTO khach_hang (ma_khach_hang, sdt, email, so_cccd, ho_va_ten, tong_chi_tieu) VALUES
('KH001', '0911222333', 'an.nguyen@gmail.com', '001100112233', N'Nguyễn Văn An', 15000000),
('KH002', '0909888777', 'binhtran@yahoo.com', '001100223344', N'Trần Thị Bình', 950000),
('KH003', '0933445566', 'cuongpham@outlook.com', '001100334455', N'Phạm Văn Cường', 255000),
('KH004', '0922334455', 'duong.le@gmail.com', '001100445566', N'Lê Thị Dương', 2750000),
('KH005', '0944556677', 'hien.nguyen@gmail.com', '001100556677', N'Nguyễn Thị Hiền', 1600000),
('KH006', '0977665544', 'khanhvo@zmail.vn', '001100667788', N'Võ Minh Khánh', 18500000),
('KH007', '0966554433', 'linh.ho@abc.com', '001100778899', N'Hồ Thùy Linh', 54000000),
('KH008', '0955443322', 'manhtruong@xyz.vn', '001100889900', N'Trương Mạnh', 720000);

-- KHO
INSERT INTO kho (ma_kho, ten_kho, dia_chi, ma_nhan_vien) VALUES
('KHO001', N'Kho Trung Tâm', N'123 Quốc lộ 1A, TP.HCM', 'NV001'),
('KHO002', N'Kho Hà Nội', N'Số 15, Đường Giải Phóng, Hà Nội', 'NV002'),
('KHO003', N'Kho Đà Nẵng', N'25 Nguyễn Văn Linh, Đà Nẵng', 'NV003'),
('KHO004', N'Kho Hải Phòng', N'Lô A4, KCN Đình Vũ, Hải Phòng', 'NV004'),
('KHO005', N'Kho Cần Thơ', N'Số 8 Trần Hưng Đạo, Cần Thơ', 'NV005'),
('KHO006', N'Kho Bình Dương', N'KCN Sóng Thần, Bình Dương', 'NV006'),
('KHO007', N'Kho Biên Hòa', N'12 Nguyễn Ái Quốc, Biên Hòa', 'NV007'),
('KHO008', N'Kho Tây Nguyên', N'Số 10 Phạm Văn Đồng, Buôn Ma Thuột', 'NV008');

-- SẢN PHẨM
INSERT INTO san_pham 
    (ma_san_pham, ten_san_pham, ma_loai, gia_san_pham, so_luong_nhap, mau_sac, kich_thuoc, ma_nguoi_ban, so_sao_trung_binh) 
VALUES
    ('SP001', N'Tivi Samsung 55 inch', 'L001', 14500000.00, 10, N'Đen', N'55 inch', 'NB001', 4.5),
    ('SP002', N'Đầm dạ hội cao cấp', 'L002', 950000.00, 25, N'Đỏ', N'M', 'NB002', 4.2),
    ('SP003', N'Sữa rửa mặt Senka', 'L003', 85000.00, 100, N'Trắng', N'120ml', 'NB003', 4.0),
    ('SP004', N'Bàn làm việc gỗ sồi', 'L004', 2750000.00, 15, N'Nâu nhạt', N'120x60cm', 'NB004', 4.8),
    ('SP005', N'Bánh kẹo Tết hộp lớn', 'L005', 320000.00, 50, N'Nhiều màu', N'Tiêu chuẩn', 'NB005', 3.9),
    ('SP006', N'Laptop Dell Inspiron', 'L001', 18500000.00, 8, N'Bạc', N'15.6 inch', 'NB006', 4.1),
    ('SP007', N'Iphone 14 Pro Max', 'L001', 27000000.00, 12, N'Tím', N'6.7 inch', 'NB007', 4.7),
    ('SP008', N'Combo bữa trưa gia đình', 'L006', 180000.00, 30, N'Nhiều màu', N'Suất ăn', 'NB008', 4.3);

-- TÀI KHOẢN NGÂN HÀNG
INSERT INTO tai_khoan_ngan_hang (so_tai_khoan, ten_ngan_hang, ten_chu_tai_khoan, ma_khach_hang) VALUES
('TK001', N'Vietcombank', N'Nguyễn Văn An', 'KH001'),
('TK002', N'BIDV', N'Trần Thị Bình', 'KH002'),
('TK003', N'ACB', N'Phạm Văn Cường', 'KH003'),
('TK004', N'Techcombank', N'Lê Thị Dương', 'KH004'),
('TK005', N'VietinBank', N'Nguyễn Thị Hiền', 'KH005'),
('TK006', N'Sacombank', N'Võ Minh Khánh', 'KH006'),
('TK007', N'MB Bank', N'Hồ Thùy Linh', 'KH007'),
('TK008', N'VPBank', N'Trương Mạnh', 'KH008');

-- VOUCHER
INSERT INTO voucher (ma_voucher, gia_tri_giam, thoi_gian_su_dung, dieu_kien_ap_dung, so_luong_ban_dau, loai_voucher) VALUES
('VC001', 50000.00, '2025-05-10', N'Áp dụng cho đơn hàng từ 500.000đ', 100, N'Giảm theo tiền'),
('VC002', 10.00, '2025-05-15', N'Áp dụng cho đơn hàng từ 300.000đ', 150, N'Giảm theo %'),
('VC003', 100000.00, '2025-06-01', N'Chỉ áp dụng cho khách hàng mới', 50, N'Giảm theo tiền'),
('VC004', 20.00, '2025-06-10', N'Đơn hàng từ 1.000.000đ', 80, N'Giảm theo %'),
('VC005', 75000.00, '2025-05-20', N'Không áp dụng sản phẩm điện tử', 120, N'Giảm theo tiền'),
('VC006', 15.00, '2025-06-30', N'Áp dụng cho khách hàng thành viên', 60, N'Giảm theo %'),
('VC007', 30000.00, '2025-05-05', N'Áp dụng cho đơn hàng bất kỳ', 200, N'Giảm theo tiền'),
('VC008', 5.00, '2025-05-25', N'Chỉ áp dụng vào cuối tuần', 90, N'Giảm theo %');

-- ĐỊA CHỈ NHẬN HÀNG
INSERT INTO dia_chi_nhan_hang (ma_dia_chi, ma_khach_hang, so_dien_thoai, ma_buu_chinh, ho_ten_nguoi_nhan, dia_chi) VALUES
('DC001', 'KH001', '0901234567', '123456', N'Nguyễn Văn An', N'123 Đường Lê Lợi, TP.HCM'),
('DC002', 'KH002', '0912345678', '234567', N'Trần Thị Bình', N'45 Nguyễn Huệ, Hà Nội'),
('DC003', 'KH003', '0923456789', '345678', N'Phạm Văn Cường', N'78 Trần Hưng Đạo, Đà Nẵng'),
('DC004', 'KH004', '0934567890', '456789', N'Lê Thị Dương', N'12B Nguyễn Trãi, Hải Phòng'),
('DC005', 'KH005', '0945678901', '567890', N'Nguyễn Thị Hiền', N'56B Lý Thường Kiệt, Cần Thơ'),
('DC006', 'KH006', '0956789012', '678901', N'Võ Minh Khánh', N'34 Trường Chinh, Bình Dương'),
('DC007', 'KH007', '0967890123', '789012', N'Hồ Thùy Linh', N'67 Nguyễn Ái Quốc, TP.HCM'),
('DC008', 'KH008', '0978901234', '890123', N'Trương Mạnh', N'89 Phạm Văn Đồng, Buôn Ma Thuột');

-- ĐƠN HÀNG (đã bổ sung tong_tien)
INSERT INTO don_hang (ma_don_hang, ngay_dat_hang, trang_thai, phuong_thuc_thanh_toan, ma_kho, ma_khach_hang, ma_dia_chi, phi_van_chuyen, ma_nguoi_ban, tong_tien) VALUES
('DH001', '2025-04-01', N'Đang xử lý', N'Chuyển khoản', 'KHO001', 'KH001', 'DC001', 30000.00, 'NB001', 29030000.00),
('DH002', '2025-04-02', N'Đang giao', N'Tiền mặt', 'KHO002', 'KH002', 'DC002', 40000.00, 'NB002', 990000.00),
('DH003', '2025-04-03', N'Hoàn thành', N'Thanh toán online', 'KHO003', 'KH003', 'DC003', 25000.00, 'NB003', 110000.00),
('DH004', '2025-04-04', N'Đang xử lý', N'Chuyển khoản', 'KHO004', 'KH004', 'DC004', 35000.00, 'NB004', 2785000.00),
('DH005', '2025-04-05', N'Đang giao', N'Tiền mặt', 'KHO005', 'KH005', 'DC005', 28000.00, 'NB005', 348000.00),
('DH006', '2025-04-06', N'Hoàn thành', N'Thanh toán online', 'KHO006', 'KH006', 'DC006', 32000.00, 'NB006', 18532000.00),
('DH007', '2025-04-07', N'Đang xử lý', N'Chuyển khoản', 'KHO007', 'KH007', 'DC007', 29000.00, 'NB007', 54029000.00),
('DH008', '2025-04-08', N'Hoàn thành', N'Tiền mặt', 'KHO008', 'KH008', 'DC008', 27000.00, 'NB008', 207000.00);

-- ĐÁNH GIÁ
INSERT INTO danh_gia (ma_khach_hang, ma_san_pham, ngay_danh_gia, noi_dung, so_sao, phan_hoi_tu_nguoi_ban) VALUES
('KH001', 'SP001', '2025-04-01', N'Sản phẩm rất tốt, chất lượng hình ảnh rõ nét', 5, N'Cảm ơn bạn đã đánh giá, chúng tôi sẽ tiếp tục cải thiện!'),
('KH002', 'SP002', '2025-04-02', N'Chất liệu vải tốt, nhưng kiểu dáng không như hình', 3, N'Chúng tôi xin lỗi vì sự bất tiện này, sẽ cải thiện trong các sản phẩm sau.'),
('KH003', 'SP003', '2025-04-03', N'Sữa rửa mặt rất phù hợp với làn da của tôi, cảm giác rất dễ chịu', 4, N'Cảm ơn bạn đã phản hồi, chúng tôi rất vui vì bạn hài lòng với sản phẩm!'),
('KH004', 'SP004', '2025-04-04', N'Bàn làm việc quá đẹp, chất liệu gỗ chắc chắn', 5, N'Cảm ơn bạn, chúng tôi sẽ tiếp tục mang đến những sản phẩm chất lượng hơn nữa!'),
('KH005', 'SP005', '2025-04-05', N'Bánh kẹo rất ngon, gói đẹp mắt, nhưng hơi ngọt một chút', 4, N'Cảm ơn bạn đã đóng góp ý kiến, chúng tôi sẽ điều chỉnh vị ngọt sao cho phù hợp hơn!'),
('KH006', 'SP006', '2025-04-06', N'Laptop rất mạnh, nhưng pin hơi yếu', 3, N'Chúng tôi sẽ xem xét vấn đề về pin và cải thiện trong lần tới.'),
('KH007', 'SP007', '2025-04-07', N'Iphone quá tuyệt vời, sử dụng mượt mà, giá cả hợp lý', 5, N'Chúng tôi rất vui khi bạn hài lòng, cảm ơn bạn đã chọn sản phẩm của chúng tôi!'),
('KH008', 'SP008', '2025-04-08', N'Combo bữa trưa rất ngon và đầy đủ, nhưng giao hàng hơi lâu', 4, N'Xin lỗi về thời gian giao hàng, chúng tôi sẽ cải thiện dịch vụ giao hàng để đáp ứng nhu cầu của bạn tốt hơn.');

-- NHÂN VIÊN KHO
INSERT INTO nhan_vien_kho (ma_nhan_vien) VALUES
('NV001'),
('NV002'),
('NV003'),
('NV004'),
('NV005'),
('NV006'),
('NV007'),
('NV008');

-- SHIPPER (đã sửa chỉ chọn từ nhân viên có sẵn)
INSERT INTO shipper (ma_nhan_vien) VALUES
('NV003'),
('NV005'),
('NV007'),
('NV008');

-- CHỨA (chi tiết đơn hàng)
INSERT INTO chua (ma_don_hang, ma_san_pham, so_luong, mau_sac, kich_thuoc) VALUES
('DH001', 'SP001', 2, N'Đen', N'55 inch'),
('DH002', 'SP002', 1, N'Đỏ', N'M'),
('DH003', 'SP003', 3, N'Trắng', N'120ml'),
('DH004', 'SP004', 1, N'Nâu nhạt', N'120x60cm'),
('DH005', 'SP005', 5, N'Nhiều màu', N'Tiêu chuẩn'),
('DH006', 'SP006', 1, N'Bạc', N'15.6 inch'),
('DH007', 'SP007', 2, N'Tím', N'6.7 inch'),
('DH008', 'SP008', 4, N'Nhiều màu', N'Suất ăn');

-- GIAO HÀNG
INSERT INTO giao_hang (ma_nhan_vien, ma_khach_hang, trang_thai) VALUES
('NV003', 'KH001', N'Đang giao'),
('NV005', 'KH002', N'Hoàn thành'),
('NV007', 'KH003', N'Đang giao'),
('NV008', 'KH004', N'Hoàn thành');

-- SỞ HỮU VOUCHER
INSERT INTO so_huu (ma_voucher, ma_khach_hang) VALUES
('VC001', 'KH001'),
('VC002', 'KH002'),
('VC003', 'KH003'),
('VC004', 'KH004'),
('VC005', 'KH005'),
('VC006', 'KH006'),
('VC007', 'KH007'),
('VC008', 'KH008');

-- ÁP DỤNG VOUCHER
INSERT INTO co (ma_don_hang, ma_voucher) VALUES
('DH001', 'VC001'),
('DH002', 'VC002'),
('DH003', 'VC003'),
('DH004', 'VC004'),
('DH005', 'VC005'),
('DH006', 'VC006'),
('DH007', 'VC007'),
('DH008', 'VC008');

-- NHẬT KÝ LÀM VIỆC
INSERT INTO nhat_kiem_lam (ma_nhat_kiem, ten_nhat_kiem, mo_ta) VALUES
('NKL001', N'Nhật ký 1', N'Ghi chép công việc ngày 1'),
('NKL002', N'Nhật ký 2', N'Ghi chép công việc ngày 2'),
('NKL003', N'Nhật ký 3', N'Ghi chép công việc ngày 3'),
('NKL004', N'Nhật ký 4', N'Ghi chép công việc ngày 4'),
('NKL005', N'Nhật ký 5', N'Ghi chép công việc ngày 5'),
('NKL006', N'Nhật ký 6', N'Ghi chép công việc ngày 6'),
('NKL007', N'Nhật ký 7', N'Ghi chép công việc ngày 7'),
('NKL008', N'Nhật ký 8', N'Ghi chép công việc ngày 8');

-- THỜI GIAN LÀM VIỆC
INSERT INTO thoi_gian_lam (ma_nhan_vien, ma_nhat_kiem_lam, bat_dau, ket_thuc) VALUES
('NV001', 'NKL001', '2025-04-01 08:00:00', '2025-04-01 17:00:00'),
('NV002', 'NKL002', '2025-04-02 08:30:00', '2025-04-02 17:30:00'),
('NV003', 'NKL003', '2025-04-03 09:00:00', '2025-04-03 18:00:00'),
('NV004', 'NKL004', '2025-04-04 08:00:00', '2025-04-04 17:00:00'),
('NV005', 'NKL005', '2025-04-05 08:30:00', '2025-04-05 17:30:00'),
('NV006', 'NKL006', '2025-04-06 09:00:00', '2025-04-06 18:00:00'),
('NV007', 'NKL007', '2025-04-07 08:00:00', '2025-04-07 17:00:00'),
('NV008', 'NKL008', '2025-04-08 08:30:00', '2025-04-08 17:30:00');

-- LẤY ĐƠN
INSERT INTO lay_don (ma_nhan_vien, ma_don_hang, trang_thai) VALUES
('NV001', 'DH001', N'Đang lấy đơn'),
('NV002', 'DH002', N'Hoàn thành'),
('NV003', 'DH003', N'Đang lấy đơn'),
('NV004', 'DH004', N'Hoàn thành'),
('NV005', 'DH005', N'Đang lấy đơn'),
('NV006', 'DH006', N'Hoàn thành'),
('NV007', 'DH007', N'Đang lấy đơn'),
('NV008', 'DH008', N'Hoàn thành');

-- THANH TOÁN
INSERT INTO thanh_toan (ma_khach_hang, ma_don_hang, so_tai_khoan, ten_ngan_hang) VALUES
('KH001', 'DH001', 'TK001', N'Vietcombank'),
('KH002', 'DH002', 'TK002', N'BIDV'),
('KH003', 'DH003', 'TK003', N'ACB'),
('KH004', 'DH004', 'TK004', N'Techcombank'),
('KH005', 'DH005', 'TK005', N'VietinBank'),
('KH006', 'DH006', 'TK006', N'Sacombank'),
('KH007', 'DH007', 'TK007', N'MB Bank'),
('KH008', 'DH008', 'TK008', N'VPBank');

-- TRUNG CHUYỂN KHO
INSERT INTO trung_chuyen (ma_kho_1, ma_kho_2) VALUES
('KHO001', 'KHO002'),
('KHO001', 'KHO003'),
('KHO002', 'KHO004'),
('KHO003', 'KHO005'),
('KHO004', 'KHO006'),
('KHO005', 'KHO007'),
('KHO006', 'KHO008'),
('KHO007', 'KHO001');

-- chi_tiet_don_hang
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, so_luong, gia_ban) VALUES
('DH001', 'SP001', 1, 14500000.00),
('DH001', 'SP006', 1, 18500000.00),
('DH002', 'SP002', 1, 950000.00),
('DH003', 'SP003', 2, 85000.00),
('DH004', 'SP004', 1, 2750000.00),
('DH005', 'SP005', 1, 320000.00),
('DH006', 'SP006', 1, 18500000.00),
('DH007', 'SP007', 1, 27000000.00),
('DH008', 'SP008', 3, 180000.00);
