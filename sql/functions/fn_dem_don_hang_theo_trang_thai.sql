CREATE OR ALTER FUNCTION fn_dem_don_hang_theo_trang_thai (
    @ma_khach_hang VARCHAR(50),
    @trang_thai NVARCHAR(50)
)
RETURNS INT
AS
BEGIN
    DECLARE @count INT = 0;

    IF NOT EXISTS (SELECT 1 FROM khach_hang WHERE ma_khach_hang = @ma_khach_hang)
        RETURN -1;

    IF @trang_thai NOT IN (N'Chờ xác nhận', N'Đang giao', N'Hoàn thành', N'Hoàn trả')
        RETURN -2;

    SELECT @count = COUNT(*)
    FROM don_hang
    WHERE ma_khach_hang = @ma_khach_hang AND trang_thai = @trang_thai;

    RETURN @count;
END;
