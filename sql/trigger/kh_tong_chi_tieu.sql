-- =============================================
-- Trigger tự động tính tổng chi tiêu của 1 khách hàng khi đặt thêm hay hoàn trả đơn hàng
-- =============================================

CREATE OR ALTER TRIGGER trg_update_tong_chi_tieu
ON don_hang
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ma_khach_hang VARCHAR(50);
    DECLARE @tong_tien FLOAT;
    DECLARE @phi_van_chuyen FLOAT;
    DECLARE @trang_thai_moi NVARCHAR(50);
    DECLARE @trang_thai_cu NVARCHAR(50);
    DECLARE @tien FLOAT;

    -----------------------------------------------
    -- Gộp xử lý INSERT và UPDATE theo từng dòng
    -----------------------------------------------
    DECLARE cur CURSOR FOR
        SELECT 
            i.ma_khach_hang, 
            i.tong_tien, 
            i.phi_van_chuyen, 
            i.trang_thai, 
            d.trang_thai
        FROM inserted i
        LEFT JOIN deleted d ON i.ma_don_hang = d.ma_don_hang;

    OPEN cur;
    FETCH NEXT FROM cur INTO @ma_khach_hang, @tong_tien, @phi_van_chuyen, @trang_thai_moi, @trang_thai_cu;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @tien = ISNULL(@tong_tien, 0);

        -- Trường hợp INSERT mà không có dòng trong deleted
        IF @trang_thai_cu IS NULL AND @trang_thai_moi = N'Hoàn thành'
        BEGIN
            UPDATE khach_hang
            SET tong_chi_tieu = ISNULL(tong_chi_tieu, 0) + @tien
            WHERE ma_khach_hang = @ma_khach_hang;
        END
        -- Trường hợp UPDATE sang Đã nhận (từ trạng thái khác)
        ELSE IF @trang_thai_cu IS NOT NULL AND @trang_thai_cu <> N'Hoàn thành' AND @trang_thai_moi = N'Hoàn thành'
        BEGIN
            UPDATE khach_hang
            SET tong_chi_tieu = ISNULL(tong_chi_tieu, 0) + @tien
            WHERE ma_khach_hang = @ma_khach_hang;
        END
        -- Trường hợp UPDATE từ Đã nhận sang Hoàn trả
        ELSE IF @trang_thai_cu = N'Hoàn thành' AND @trang_thai_moi = N'Hoàn trả'
        BEGIN
            UPDATE khach_hang
            SET tong_chi_tieu = ISNULL(tong_chi_tieu, 0) - @tien
            WHERE ma_khach_hang = @ma_khach_hang;
        END

        FETCH NEXT FROM cur INTO @ma_khach_hang, @tong_tien, @phi_van_chuyen, @trang_thai_moi, @trang_thai_cu;
    END

    CLOSE cur;
    DEALLOCATE cur;
END;