-- =============================================
-- Bảng loại sản phẩm
-- =============================================
CREATE TABLE loai_san_pham (
    ma_loai VARCHAR(10) PRIMARY KEY,
    ten_loai NVARCHAR(100) NOT NULL,
    mo_ta NVARCHAR(255),
    CONSTRAINT CK_LoaiSP_MaLoai CHECK (
    LEFT(ma_loai, 1) = 'L' AND
    ISNUMERIC(SUBSTRING(ma_loai, 2, 3)) = 1 AND
    LEN(ma_loai) = 4
)

);

-- =============================================
-- Bảng cá nhân
-- =============================================
CREATE TABLE ca_nhan (
    ma_ca_nhan VARCHAR(10) PRIMARY KEY,
    so_cccd VARCHAR(12) NOT NULL UNIQUE 
        CHECK (LEN(so_cccd) = 12 AND so_cccd NOT LIKE '%[^0-9]%'),
    ho_va_ten NVARCHAR(100) NOT NULL,
    CONSTRAINT CK_CaNhan_MaCN CHECK (ma_ca_nhan LIKE 'CN[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng công ty/doanh nghiệp
-- =============================================
CREATE TABLE cong_ty_doanh_nghiep (
    ma_cong_ty VARCHAR(10) PRIMARY KEY,
    so_dang_ky_kinh_doanh VARCHAR(20) NOT NULL UNIQUE,
    hinh_thuc_kinh_doanh NVARCHAR(100) NOT NULL,
    ten_cong_ty NVARCHAR(100) NOT NULL,
    CONSTRAINT CK_CT_MaCT CHECK (ma_cong_ty LIKE 'CT[0-9][0-9][0-9]'),
    CONSTRAINT CK_CT_HinhThuc CHECK (hinh_thuc_kinh_doanh IN (
        N'Công ty TNHH một thành viên',
        N'Công ty TNHH hai thành viên trở lên',
        N'Công ty cổ phần',
        N'Doanh nghiệp tư nhân',
        N'Công ty hợp danh'
    ))
);

-- =============================================
-- Bảng người bán
-- =============================================
CREATE TABLE nguoi_ban (
    ma_nguoi_ban VARCHAR(10) PRIMARY KEY,
    ten_cua_hang NVARCHAR(100) NOT NULL,
    email VARCHAR(100) CHECK (email LIKE '%_@__%.__%'),
    so_dien_thoai VARCHAR(15) CHECK (LEN(so_dien_thoai) = 10 AND so_dien_thoai LIKE '0[0-9]%'),
    CONSTRAINT CK_NB_MaNB CHECK (ma_nguoi_ban LIKE 'NB[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng nhân viên
-- =============================================
CREATE TABLE nhan_vien (
    ma_nhan_vien VARCHAR(10) PRIMARY KEY,
    ho_ten NVARCHAR(100) NOT NULL,
    so_cccd VARCHAR(12) NOT NULL UNIQUE 
        CHECK (LEN(so_cccd) = 12 AND so_cccd NOT LIKE '%[^0-9]%'),
    ngay_sinh DATE NOT NULL,
    que_quan NVARCHAR(100) NOT NULL,
    luong DECIMAL(18,2) NOT NULL CHECK (luong >= 0),
    dia_chi_tam_tru NVARCHAR(200),
    email VARCHAR(100) CHECK (email LIKE '%_@__%.__%'),
    so_dien_thoai VARCHAR(15) CHECK (LEN(so_dien_thoai) = 10 AND so_dien_thoai LIKE '0[0-9]%'),
    CONSTRAINT CK_NV_MaNV CHECK (ma_nhan_vien LIKE 'NV[0-9][0-9][0-9]'),
    CONSTRAINT CK_NV_Tuoi CHECK (DATEDIFF(YEAR, ngay_sinh, GETDATE()) >= 18)
);

-- =============================================
-- Bảng khách hàng
-- =============================================
CREATE TABLE khach_hang (
    ma_khach_hang VARCHAR(10) PRIMARY KEY,
    sdt VARCHAR(15) NOT NULL CHECK (LEN(sdt) = 10 AND sdt LIKE '0[0-9]%'),
    email VARCHAR(100) CHECK (email LIKE '%_@__%.__%'),
    so_cccd VARCHAR(12) UNIQUE CHECK (LEN(so_cccd) = 12 AND so_cccd NOT LIKE '%[^0-9]%'),
    ho_va_ten NVARCHAR(100) NOT NULL,
    tong_chi_tieu DECIMAL(18,2) DEFAULT 0 CHECK (tong_chi_tieu >= 0),
    CONSTRAINT CK_KH_MaKH CHECK (ma_khach_hang LIKE 'KH[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng kho
-- =============================================
CREATE TABLE kho (
    ma_kho VARCHAR(10) PRIMARY KEY,
    ten_kho NVARCHAR(100) NOT NULL,
    dia_chi NVARCHAR(200) NOT NULL,
    ma_nhan_vien VARCHAR(10) NOT NULL,
    CONSTRAINT FK_Kho_NhanVien FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT CK_Kho_MaKho CHECK (ma_kho LIKE 'KHO[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng sản phẩm
-- =============================================
CREATE TABLE san_pham (
    ma_san_pham VARCHAR(10) PRIMARY KEY,
    ten_san_pham NVARCHAR(100) NOT NULL,
    ma_loai VARCHAR(10) NOT NULL,
    gia_san_pham DECIMAL(18,2) NOT NULL CHECK (gia_san_pham > 0),
    so_luong_nhap INT NOT NULL CHECK (so_luong_nhap >= 0),
    mau_sac NVARCHAR(50),
    kich_thuoc NVARCHAR(50),
    ma_nguoi_ban VARCHAR(10) NOT NULL,
    so_luot_danh_gia INT DEFAULT 0 CHECK (so_luot_danh_gia >= 0),
    so_luong_con_lai INT DEFAULT 0 CHECK (so_luong_con_lai >= 0),
    so_sao_trung_binh DECIMAL(3,2) DEFAULT 0 CHECK (so_sao_trung_binh BETWEEN 0 AND 5),
    CONSTRAINT FK_SP_LoaiSP FOREIGN KEY (ma_loai) REFERENCES loai_san_pham(ma_loai),
    CONSTRAINT FK_SP_NguoiBan FOREIGN KEY (ma_nguoi_ban) REFERENCES nguoi_ban(ma_nguoi_ban),
    CONSTRAINT CK_SP_MaSP CHECK (ma_san_pham LIKE 'SP[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng tài khoản ngân hàng
-- =============================================
CREATE TABLE tai_khoan_ngan_hang (
    so_tai_khoan VARCHAR(20) PRIMARY KEY,
    ten_ngan_hang NVARCHAR(100) NOT NULL,
    ten_chu_tai_khoan NVARCHAR(100) NOT NULL,
    ma_khach_hang VARCHAR(10) NOT NULL,
    CONSTRAINT FK_TKNH_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang)
);

-- =============================================
-- Bảng voucher
-- =============================================
CREATE TABLE voucher (
    ma_voucher VARCHAR(10) PRIMARY KEY,
    gia_tri_giam DECIMAL(18,2) NOT NULL CHECK (gia_tri_giam > 0),
    thoi_gian_su_dung DATE NOT NULL,
    dieu_kien_ap_dung NVARCHAR(255),
    so_luong_ban_dau INT NOT NULL CHECK (so_luong_ban_dau > 0),
    loai_voucher NVARCHAR(50) NOT NULL CHECK (loai_voucher IN (N'Giảm theo tiền', N'Giảm theo %')),
    CONSTRAINT CK_Voucher_MaVC CHECK (ma_voucher LIKE 'VC[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng địa chỉ nhận hàng
-- =============================================
CREATE TABLE dia_chi_nhan_hang (
    ma_dia_chi VARCHAR(10) PRIMARY KEY,
    ma_khach_hang VARCHAR(10) NOT NULL,
    so_dien_thoai VARCHAR(15) CHECK (LEN(so_dien_thoai) = 10 AND so_dien_thoai LIKE '0[0-9]%'),
    ma_buu_chinh VARCHAR(10),
    ho_ten_nguoi_nhan NVARCHAR(100) NOT NULL,
    dia_chi NVARCHAR(200) NOT NULL,
    CONSTRAINT FK_DCNH_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang),
    CONSTRAINT CK_DCNH_MaDC CHECK (ma_dia_chi LIKE 'DC[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng đơn hàng
-- =============================================
CREATE TABLE don_hang (
    ma_don_hang VARCHAR(10) PRIMARY KEY,
    ngay_dat_hang DATE NOT NULL DEFAULT GETDATE() CHECK (ngay_dat_hang <= GETDATE()),
    trang_thai NVARCHAR(50) NOT NULL CHECK (trang_thai IN (
        N'Đang xử lý', N'Đang giao', N'Hoàn thành', N'Đã hủy',N'Hoàn trả'
    )),
    phuong_thuc_thanh_toan NVARCHAR(50) CHECK (phuong_thuc_thanh_toan IN (
        N'Tiền mặt', N'Chuyển khoản', N'Thanh toán online', NULL
    )),
    ma_kho VARCHAR(10) NOT NULL,
    ma_khach_hang VARCHAR(10) NOT NULL,
    ma_dia_chi VARCHAR(10) NOT NULL,
    phi_van_chuyen DECIMAL(18,2) NOT NULL CHECK (phi_van_chuyen >= 0),
    ma_nguoi_ban VARCHAR(10) NOT NULL,
    trang_thai_thanh_toan	INT NOT NULL DEFAULT 0 CHECK (trang_thai_thanh_toan IN (0, 1)),
    ngay_thanh_toan DATE NOT NULL DEFAULT GETDATE() CHECK (ngay_thanh_toan <= GETDATE()),
    tong_tien DECIMAL(18,2) NOT NULL CHECK (tong_tien >= 0),
    CONSTRAINT FK_DH_Kho FOREIGN KEY (ma_kho) REFERENCES kho(ma_kho),
    CONSTRAINT FK_DH_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang),
    CONSTRAINT FK_DH_DiaChi FOREIGN KEY (ma_dia_chi) REFERENCES dia_chi_nhan_hang(ma_dia_chi),
    CONSTRAINT FK_DH_NguoiBan FOREIGN KEY (ma_nguoi_ban) REFERENCES nguoi_ban(ma_nguoi_ban),
    CONSTRAINT CK_DH_MaDH CHECK (ma_don_hang LIKE 'DH[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng đánh giá
-- =============================================
CREATE TABLE danh_gia (
    ma_khach_hang VARCHAR(10) NOT NULL,
    ma_san_pham VARCHAR(10) NOT NULL,
    ngay_danh_gia DATE NOT NULL DEFAULT GETDATE(),
    noi_dung NVARCHAR(500),
    so_sao INT NOT NULL CHECK (so_sao BETWEEN 1 AND 5),
    phan_hoi_tu_nguoi_ban NVARCHAR(500),
    CONSTRAINT PK_DanhGia PRIMARY KEY (ma_khach_hang, ma_san_pham),
    CONSTRAINT FK_DG_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang),
    CONSTRAINT FK_DG_SanPham FOREIGN KEY (ma_san_pham) REFERENCES san_pham(ma_san_pham)
);

-- =============================================
-- Bảng nhân viên kho
-- =============================================
CREATE TABLE nhan_vien_kho (
    ma_nhan_vien VARCHAR(10) PRIMARY KEY,
    CONSTRAINT FK_NVK_NhanVien FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien)
);

-- =============================================
-- Bảng shipper
-- =============================================
CREATE TABLE shipper (
    ma_nhan_vien VARCHAR(10) PRIMARY KEY,
    CONSTRAINT FK_Shipper_NhanVien FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien)
);

-- =============================================
-- Bảng chứa (chi tiết đơn hàng)
-- =============================================
CREATE TABLE chua (
    ma_don_hang VARCHAR(10) NOT NULL,
    ma_san_pham VARCHAR(10) NOT NULL,
    so_luong INT NOT NULL CHECK (so_luong > 0),
    mau_sac NVARCHAR(50),
    kich_thuoc NVARCHAR(50),
    CONSTRAINT PK_Chua PRIMARY KEY (ma_don_hang, ma_san_pham),
    CONSTRAINT FK_Chua_DonHang FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang),
    CONSTRAINT FK_Chua_SanPham FOREIGN KEY (ma_san_pham) REFERENCES san_pham(ma_san_pham)
);

-- =============================================
-- Bảng giao hàng
-- =============================================
CREATE TABLE giao_hang (
    ma_nhan_vien VARCHAR(10) NOT NULL,
    ma_khach_hang VARCHAR(10) NOT NULL,
    trang_thai NVARCHAR(50) NOT NULL CHECK (trang_thai IN (N'Đang giao', N'Hoàn thành', N'Đã hủy')),
    CONSTRAINT PK_GiaoHang PRIMARY KEY (ma_nhan_vien, ma_khach_hang),
    CONSTRAINT FK_GH_NhanVien FOREIGN KEY (ma_nhan_vien) REFERENCES shipper(ma_nhan_vien),
    CONSTRAINT FK_GH_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang)
);

-- =============================================
-- Bảng sở hữu voucher
-- =============================================
CREATE TABLE so_huu (
    ma_voucher VARCHAR(10) NOT NULL,
    ma_khach_hang VARCHAR(10) NOT NULL,
    CONSTRAINT PK_SoHuu PRIMARY KEY (ma_voucher, ma_khach_hang),
    CONSTRAINT FK_SH_Voucher FOREIGN KEY (ma_voucher) REFERENCES voucher(ma_voucher),
    CONSTRAINT FK_SH_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang)
);

-- =============================================
-- Bảng áp dụng voucher
-- =============================================
CREATE TABLE co (
    ma_don_hang VARCHAR(10) NOT NULL,
    ma_voucher VARCHAR(10) NOT NULL,
    CONSTRAINT PK_Co PRIMARY KEY (ma_don_hang, ma_voucher),
    CONSTRAINT FK_Co_DonHang FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang),
    CONSTRAINT FK_Co_Voucher FOREIGN KEY (ma_voucher) REFERENCES voucher(ma_voucher)
);

-- =============================================
-- Bảng nhật ký làm việc
-- =============================================
CREATE TABLE nhat_kiem_lam (
    ma_nhat_kiem VARCHAR(10) PRIMARY KEY,
    ten_nhat_kiem NVARCHAR(100) NOT NULL,
    mo_ta NVARCHAR(500),
    CONSTRAINT CK_NKL_MaNKL CHECK (ma_nhat_kiem LIKE 'NKL[0-9][0-9][0-9]')
);

-- =============================================
-- Bảng thời gian làm việc
-- =============================================
CREATE TABLE thoi_gian_lam (
    ma_nhan_vien VARCHAR(10) NOT NULL,
    ma_nhat_kiem_lam VARCHAR(10) NOT NULL,
    bat_dau DATETIME NOT NULL,
    ket_thuc DATETIME NOT NULL,
    CONSTRAINT PK_ThoiGianLam PRIMARY KEY (ma_nhan_vien, ma_nhat_kiem_lam),
    CONSTRAINT FK_TGL_NhanVien FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien),
    CONSTRAINT FK_TGL_NhatKy FOREIGN KEY (ma_nhat_kiem_lam) REFERENCES nhat_kiem_lam(ma_nhat_kiem),
    CONSTRAINT CK_TGL_ThoiGian CHECK (ket_thuc > bat_dau)
);

-- =============================================
-- Bảng lấy đơn
-- =============================================
CREATE TABLE lay_don (
    ma_nhan_vien VARCHAR(10) NOT NULL,
    ma_don_hang VARCHAR(10) NOT NULL,
    trang_thai NVARCHAR(50) NOT NULL CHECK (trang_thai IN (N'Đang lấy đơn', N'Hoàn thành', N'Đã hủy')),
    CONSTRAINT PK_LayDon PRIMARY KEY (ma_nhan_vien, ma_don_hang),
    CONSTRAINT FK_LD_NhanVien FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien_kho(ma_nhan_vien),
    CONSTRAINT FK_LD_DonHang FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang)
);

-- =============================================
-- Bảng thanh toán
-- =============================================
CREATE TABLE thanh_toan (
    ma_khach_hang VARCHAR(10) NOT NULL,
    ma_don_hang VARCHAR(10) NOT NULL,
    so_tai_khoan VARCHAR(20) NOT NULL,
    ten_ngan_hang NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_ThanhToan PRIMARY KEY (ma_khach_hang, ma_don_hang),
    CONSTRAINT FK_TT_KhachHang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang),
    CONSTRAINT FK_TT_DonHang FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang),
    CONSTRAINT FK_TT_TaiKhoan FOREIGN KEY (so_tai_khoan) REFERENCES tai_khoan_ngan_hang(so_tai_khoan)
);

-- =============================================
-- Bảng trung chuyển kho
-- =============================================
CREATE TABLE trung_chuyen (
    ma_kho_1 VARCHAR(10) NOT NULL,
    ma_kho_2 VARCHAR(10) NOT NULL,
    CONSTRAINT PK_TrungChuyen PRIMARY KEY (ma_kho_1, ma_kho_2),
    CONSTRAINT FK_TC_Kho1 FOREIGN KEY (ma_kho_1) REFERENCES kho(ma_kho),
    CONSTRAINT FK_TC_Kho2 FOREIGN KEY (ma_kho_2) REFERENCES kho(ma_kho),
    CONSTRAINT CK_TC_KhoKhacNhau CHECK (ma_kho_1 <> ma_kho_2)
);

-- =============================================
-- Bảng chi tiet đơn hàng
-- =============================================
CREATE TABLE chi_tiet_don_hang (
    ma_don_hang VARCHAR(10),
    ma_san_pham VARCHAR(10),
    so_luong INT NOT NULL CHECK (so_luong > 0),
    gia_ban DECIMAL(18,2) NOT NULL CHECK (gia_ban > 0),
    PRIMARY KEY (ma_don_hang, ma_san_pham),
    CONSTRAINT FK_CTDH_DonHang FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang),
    CONSTRAINT FK_CTDH_SanPham FOREIGN KEY (ma_san_pham) REFERENCES san_pham(ma_san_pham)
);