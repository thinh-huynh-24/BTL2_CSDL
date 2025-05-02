USE SHOPPE
GO
CREATE OR ALTER PROCEDURE DELETE_DonHang
    @ma_don_hang VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Kiểm tra sự tồn tại của đơn hàng
    IF NOT EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @ma_don_hang)
    BEGIN
        RAISERROR(N'Mã đơn hàng không tồn tại.', 16, 1);
        RETURN;
    END

    -- 2. Xóa các bản ghi liên quan trong bảng thanh_toan
    DELETE FROM thanh_toan WHERE ma_don_hang = @ma_don_hang;

    -- 3. Xóa đơn hàng
    DELETE FROM don_hang WHERE ma_don_hang = @ma_don_hang;
END;
