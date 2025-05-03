-- =============================================
-- Dữ liệu loại sản phẩm mặc định
-- =============================================
INSERT INTO loai_san_pham (ma_loai, ten_loai, mo_ta) VALUES
('L000', N'Khác', N'Loại mặc định cho sản phẩm chưa phân loại');
GO

-- =============================================
-- Tài khoản admin hệ thống
-- =============================================
INSERT INTO nhan_vien (
    ma_nhan_vien, 
    ho_ten, 
    so_cccd, 
    ngay_sinh, 
    que_quan, 
    luong, 
    dia_chi_tam_tru, 
    email, 
    so_dien_thoai
) VALUES (
    'NV000', 
    N'Quản trị hệ thống', 
    '000000000000', 
    '1990-01-01', 
    N'Hà Nội', 
    20000000.00, 
    N'Trụ sở chính', 
    'admin@company.vn', 
    '0900000000'
);
GO

-- =============================================
-- Kho mặc định
-- =============================================
INSERT INTO kho (ma_kho, ten_kho, dia_chi, ma_nhan_vien) VALUES
('KHO000', N'Kho mặc định', N'Trụ sở chính', 'NV000');
GO

-- =============================================
-- Người bán hệ thống
-- =============================================
INSERT INTO nguoi_ban (ma_nguoi_ban, ten_cua_hang, email, so_dien_thoai) VALUES
('NB000', N'Hệ thống', 'system@company.vn', '0900000001');
GO