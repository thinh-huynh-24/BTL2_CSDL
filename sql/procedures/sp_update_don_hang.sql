USE SHOPPE
GO
CREATE OR ALTER PROCEDURE UPDATE_DonHang
    @ma_don_hang VARCHAR(50),
    @ngay_dat DATE,
    @trang_thai NVARCHAR(50),
    @tong_tien FLOAT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @ma_don_hang)
    BEGIN
        RAISERROR(N'Mã đơn hàng không tồn tại.', 16, 1);
        RETURN;
    END

    UPDATE don_hang
    SET ngay_dat_hang = @ngay_dat,
        trang_thai = @trang_thai,
        tong_tien = @tong_tien
    WHERE ma_don_hang = @ma_don_hang;
END;
