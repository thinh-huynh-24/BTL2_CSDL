CREATE OR ALTER PROCEDURE UPDATE_DonHang
    @ma_don_hang VARCHAR(50),
    @ngay_dat DATE = NULL,
    @trang_thai NVARCHAR(50) = NULL,
    @tong_tien FLOAT = NULL,
    @ma_dia_chi VARCHAR(10) = NULL,
    @phi_van_chuyen DECIMAL(18,2) = NULL,
    @phuong_thuc_thanh_toan NVARCHAR(50) = NULL,
    @trang_thai_thanh_toan INT = NULL,
    @ngay_thanh_toan DATE = NULL
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @ma_don_hang)
    BEGIN
        RAISERROR(N'Mã đơn hàng không tồn tại.', 16, 1);
        RETURN;
    END

    UPDATE don_hang
    SET 
        ngay_dat_hang = ISNULL(@ngay_dat, ngay_dat_hang),
        trang_thai = ISNULL(@trang_thai, trang_thai),
        tong_tien = ISNULL(@tong_tien, tong_tien),
        ma_dia_chi = ISNULL(@ma_dia_chi, ma_dia_chi),
        phi_van_chuyen = ISNULL(@phi_van_chuyen, phi_van_chuyen),
        phuong_thuc_thanh_toan = ISNULL(@phuong_thuc_thanh_toan, phuong_thuc_thanh_toan),
        trang_thai_thanh_toan = ISNULL(@trang_thai_thanh_toan, trang_thai_thanh_toan),
        ngay_thanh_toan = ISNULL(@ngay_thanh_toan, ngay_thanh_toan)
    WHERE ma_don_hang = @ma_don_hang;
END;