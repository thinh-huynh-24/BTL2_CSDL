const sql = require('mssql');

// Cấu hình kết nối tới SQL Server
const dbConfig = {
    user: 'sa', // Tên người dùng
    password: '123', // Mật khẩu
    server: 'localhost', // Địa chỉ server
    database: 'SHOPPE', // Tên cơ sở dữ liệu
    options: {
        encrypt: true, // Sử dụng mã hóa nếu cần
        trustServerCertificate: true // Để bỏ qua xác thực SSL
    }
};

// Xuất đối tượng cấu hình và đối tượng mssql
module.exports = { sql, dbConfig };
