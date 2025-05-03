-- =============================================
-- Trigger tự động tính toán số sao của sản phẩm khi có thêm, xóa, sửa đánh giá
-- =============================================
CREATE OR ALTER TRIGGER trg_update_so_sao
ON danh_gia
AFTER INSERT, DELETE, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ma_san_pham VARCHAR(50);
    DECLARE @so_sao_moi INT;
    DECLARE @so_sao_cu INT;
    DECLARE @luot INT;
    DECLARE @tb FLOAT;

    -- INSERT: đánh giá mới
    DECLARE cur_insert CURSOR FOR
        SELECT i.ma_san_pham, i.so_sao
        FROM inserted i
        LEFT JOIN deleted d 
            ON i.ma_khach_hang = d.ma_khach_hang AND i.ma_san_pham = d.ma_san_pham
        WHERE d.ma_khach_hang IS NULL;

    OPEN cur_insert;
    FETCH NEXT FROM cur_insert INTO @ma_san_pham, @so_sao_moi;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT @luot = ISNULL(so_luot_danh_gia, 0), 
               @tb = ISNULL(so_sao_trung_binh, 0)
        FROM san_pham WHERE ma_san_pham = @ma_san_pham;

        UPDATE san_pham
        SET 
            so_luot_danh_gia = @luot + 1,
            so_sao_trung_binh = (@tb * @luot + @so_sao_moi) / (@luot + 1)
        WHERE ma_san_pham = @ma_san_pham;

        FETCH NEXT FROM cur_insert INTO @ma_san_pham, @so_sao_moi;
    END

    CLOSE cur_insert;
    DEALLOCATE cur_insert;

    -- DELETE: xoá đánh giá
    DECLARE cur_delete CURSOR FOR
        SELECT d.ma_san_pham, d.so_sao
        FROM deleted d
        LEFT JOIN inserted i 
            ON i.ma_khach_hang = d.ma_khach_hang AND i.ma_san_pham = d.ma_san_pham
        WHERE i.ma_khach_hang IS NULL;

    OPEN cur_delete;
    FETCH NEXT FROM cur_delete INTO @ma_san_pham, @so_sao_cu;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT @luot = ISNULL(so_luot_danh_gia, 0), 
               @tb = ISNULL(so_sao_trung_binh, 0)
        FROM san_pham WHERE ma_san_pham = @ma_san_pham;

        IF @luot > 1
        BEGIN
            UPDATE san_pham
            SET 
                so_luot_danh_gia = @luot - 1,
                so_sao_trung_binh = (@tb * @luot - @so_sao_cu) / (@luot - 1)
            WHERE ma_san_pham = @ma_san_pham;
        END
        ELSE
        BEGIN
            UPDATE san_pham
            SET 
                so_luot_danh_gia = 0,
                so_sao_trung_binh = 0
            WHERE ma_san_pham = @ma_san_pham;
        END

        FETCH NEXT FROM cur_delete INTO @ma_san_pham, @so_sao_cu;
    END

    CLOSE cur_delete;
    DEALLOCATE cur_delete;

    -- UPDATE: thay đổi số sao
    DECLARE cur_update CURSOR FOR
        SELECT i.ma_san_pham, i.so_sao, d.so_sao
        FROM inserted i
        JOIN deleted d 
            ON i.ma_khach_hang = d.ma_khach_hang 
            AND i.ma_san_pham = d.ma_san_pham
        WHERE i.so_sao <> d.so_sao;

    OPEN cur_update;
    FETCH NEXT FROM cur_update INTO @ma_san_pham, @so_sao_moi, @so_sao_cu;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT @luot = ISNULL(so_luot_danh_gia, 0), 
               @tb = ISNULL(so_sao_trung_binh, 0)
        FROM san_pham WHERE ma_san_pham = @ma_san_pham;

        IF @luot > 0
        BEGIN
            UPDATE san_pham
            SET 
                so_sao_trung_binh = (@tb * @luot - @so_sao_cu + @so_sao_moi) / @luot
            WHERE ma_san_pham = @ma_san_pham;
        END

        FETCH NEXT FROM cur_update INTO @ma_san_pham, @so_sao_moi, @so_sao_cu;
    END

    CLOSE cur_update;
    DEALLOCATE cur_update;
END;
GO