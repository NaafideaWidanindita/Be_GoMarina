const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "marina_db",
});

async function testConnection() {
    try {
        await db.getConnection();
        console.log("Koneksi ke database berhasil!");
    } catch (error) {
        console.error("Gagal terhubung ke database:", error);
    }
}

async function query(command, values) {
    try {
        const [value] = await db.query(command, values ?? []);
        return value;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { query, testConnection };