CREATE OR ALTER PROCEDURE DELETE_DonHang
    @ma_don_hang VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- 1. Kiểm tra sự tồn tại của đơn hàng
        IF NOT EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @ma_don_hang)
        BEGIN
            RAISERROR(N'Mã đơn hàng không tồn tại.', 16, 1);
            RETURN;
        END

        DELETE FROM thanh_toan WHERE ma_don_hang = @ma_don_hang;

        DELETE FROM chua WHERE ma_don_hang = @ma_don_hang;

        DELETE FROM co WHERE ma_don_hang = @ma_don_hang;

        DELETE FROM lay_don WHERE ma_don_hang = @ma_don_hang;

        DELETE FROM chi_tiet_don_hang WHERE ma_don_hang = @ma_don_hang;

        DELETE FROM don_hang WHERE ma_don_hang = @ma_don_hang;

        PRINT N'Xóa đơn hàng thành công.';
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;