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

        -- 2. Xóa các bản ghi liên quan trong bảng thanh_toan
        DELETE FROM thanh_toan WHERE ma_don_hang = @ma_don_hang;

        -- 3. Xóa các bản ghi liên quan trong bảng chua
        DELETE FROM chua WHERE ma_don_hang = @ma_don_hang;

        -- 4. Xóa các bản ghi liên quan trong bảng co
        DELETE FROM co WHERE ma_don_hang = @ma_don_hang;

        -- 5. Xóa các bản ghi liên quan trong bảng lay_don
        DELETE FROM lay_don WHERE ma_don_hang = @ma_don_hang;

        -- 6. Xóa các bản ghi liên quan trong bảng chi_tiet_don_hang
        DELETE FROM chi_tiet_don_hang WHERE ma_don_hang = @ma_don_hang;

        -- 7. Xóa đơn hàng
        DELETE FROM don_hang WHERE ma_don_hang = @ma_don_hang;

        PRINT N'Xóa đơn hàng thành công.';
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;