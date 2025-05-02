CREATE OR ALTER FUNCTION fn_tong_gia_tri_don_hang (
    @ma_don_hang VARCHAR(50)
)
RETURNS FLOAT
AS
BEGIN
    DECLARE @tong_gia_tri FLOAT = 0;
    
    -- Kiểm tra xem đơn hàng có tồn tại không
    IF NOT EXISTS (SELECT 1 FROM don_hang WHERE ma_don_hang = @ma_don_hang)
    BEGIN
        -- Trả về NULL nếu đơn hàng không tồn tại
        RETURN NULL;
    END

    -- Tính tổng giá trị đơn hàng
    SELECT @tong_gia_tri = SUM(ctd.gia_ban * ctd.so_luong) -- Chỉnh sửa cột 'gia_ban' nếu cần
    FROM chi_tiet_don_hang ctd
    INNER JOIN don_hang dh ON ctd.ma_don_hang = dh.ma_don_hang
    WHERE dh.ma_don_hang = @ma_don_hang;

    RETURN @tong_gia_tri;
END;
