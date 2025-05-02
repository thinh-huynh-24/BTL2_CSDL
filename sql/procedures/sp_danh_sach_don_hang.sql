USE SHOPPE
GO
CREATE OR ALTER PROCEDURE sp_danh_sach_don_hang
    @ma_khach_hang VARCHAR(50),
    @trang_thai NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM khach_hang WHERE ma_khach_hang = @ma_khach_hang)
    BEGIN
        RAISERROR(N'Mã khách hàng không tồn tại.', 16, 1);
        RETURN;
    END

    SELECT dh.ma_don_hang, dh.ngay_dat_hang, dh.trang_thai, dh.tong_tien, kh.ho_va_ten, kh.email
    FROM don_hang dh
    JOIN khach_hang kh ON dh.ma_khach_hang = kh.ma_khach_hang
    WHERE dh.ma_khach_hang = @ma_khach_hang
      AND (@trang_thai IS NULL OR dh.trang_thai = @trang_thai)
    ORDER BY dh.ngay_dat_hang DESC;
END;
