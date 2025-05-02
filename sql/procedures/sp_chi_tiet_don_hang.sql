USE SHOPPE
GO
CREATE OR ALTER PROCEDURE sp_chi_tiet_don_hang
    @ma_don_hang VARCHAR(50)
AS
BEGIN
    -- Kiểm tra xem mã đơn hàng có tồn tại hay không
    IF NOT EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @ma_don_hang)
    BEGIN
        RAISERROR(N'Mã đơn hàng không tồn tại.', 16, 1);
        RETURN;
    END

    -- Lấy thông tin chi tiết sản phẩm trong đơn hàng
    SELECT 
        sp.ten_san_pham, 
        ctdh.so_luong, 
        ctdh.gia_ban, 
        (ctdh.so_luong * ctdh.gia_ban) AS thanh_tien
    FROM chi_tiet_don_hang ctdh
    JOIN san_pham sp ON ctdh.ma_san_pham = sp.ma_san_pham
    WHERE ctdh.ma_don_hang = @ma_don_hang
    ORDER BY sp.ten_san_pham;
END;
