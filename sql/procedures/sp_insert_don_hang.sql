CREATE OR ALTER PROCEDURE INSERT_DonHang
    @MaDonHang VARCHAR(10),
    @MaNguoiBan VARCHAR(10),
    @MaDiaChi VARCHAR(10),
    @PhiVanChuyen DECIMAL(18,2),
    @MaKhachHang VARCHAR(10),
    @MaKho VARCHAR(10),
    @PhuongThucThanhToan NVARCHAR(50),
    @TrangThai NVARCHAR(50),
    @TrangThaiThanhToan INT,
    @NgayThanhToan DATE = NULL, -- Có thể để mặc định
    @TongTien DECIMAL(18,2),
    @ErrorMessage NVARCHAR(200) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Mặc định ngày thanh toán là hôm nay nếu không truyền vào
    IF @NgayThanhToan IS NULL
        SET @NgayThanhToan = GETDATE();

    -- 1. Kiểm tra định dạng mã đơn hàng
    IF @MaDonHang NOT LIKE 'DH[0-9][0-9][0-9]'
    BEGIN
        SET @ErrorMessage = N'Mã đơn hàng không đúng định dạng DH000.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    -- 2. Kiểm tra đơn hàng đã tồn tại
    IF EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @MaDonHang)
    BEGIN
        SET @ErrorMessage = N'Mã đơn hàng đã tồn tại.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    -- 3. Kiểm tra các mã khóa ngoại
    IF NOT EXISTS (SELECT 1 FROM nguoi_ban WHERE ma_nguoi_ban = @MaNguoiBan)
    BEGIN
        SET @ErrorMessage = N'Người bán không tồn tại.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM dia_chi_nhan_hang WHERE ma_dia_chi = @MaDiaChi)
    BEGIN
        SET @ErrorMessage = N'Địa chỉ nhận hàng không tồn tại.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM khach_hang WHERE ma_khach_hang = @MaKhachHang)
    BEGIN
        SET @ErrorMessage = N'Khách hàng không tồn tại.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM kho WHERE ma_kho = @MaKho)
    BEGIN
        SET @ErrorMessage = N'Kho không tồn tại.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    -- 4. Kiểm tra các giá trị ràng buộc logic
    IF @PhiVanChuyen < 0
    BEGIN
        SET @ErrorMessage = N'Phí vận chuyển không được âm.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF @TongTien < 0
    BEGIN
        SET @ErrorMessage = N'Tổng tiền không được âm.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF @TrangThai NOT IN (N'Đang xử lý', N'Đang giao', N'Hoàn thành', N'Đã hủy', N'Hoàn trả')
    BEGIN
        SET @ErrorMessage = N'Trạng thái đơn hàng không hợp lệ.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF @PhuongThucThanhToan NOT IN (N'Tiền mặt', N'Chuyển khoản', N'Thanh toán online')
    BEGIN
        SET @ErrorMessage = N'Phương thức thanh toán không hợp lệ.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF @TrangThaiThanhToan NOT IN (0, 1)
    BEGIN
SET @ErrorMessage = N'Trạng thái thanh toán phải là 0 hoặc 1.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    IF @NgayThanhToan > GETDATE()
    BEGIN
        SET @ErrorMessage = N'Ngày thanh toán không được vượt quá hôm nay.';
        RAISERROR(@ErrorMessage, 16, 1);
        RETURN;
    END

    -- 5. Chèn dữ liệu
    INSERT INTO don_hang(
        ma_don_hang, ngay_dat_hang, trang_thai, phuong_thuc_thanh_toan,
        ma_kho, ma_khach_hang, ma_dia_chi, phi_van_chuyen, ma_nguoi_ban,
        trang_thai_thanh_toan, ngay_thanh_toan, tong_tien
    )
    VALUES (
        @MaDonHang, GETDATE(), @TrangThai, @PhuongThucThanhToan,
        @MaKho, @MaKhachHang, @MaDiaChi, @PhiVanChuyen, @MaNguoiBan,
        @TrangThaiThanhToan, @NgayThanhToan, @TongTien
    );

    SET @ErrorMessage = N'Thêm đơn hàng thành công.';
END