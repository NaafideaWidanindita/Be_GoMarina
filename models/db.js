const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

// Konfigurasi pool koneksi MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Host database
  user: process.env.DB_USER, // Username database
  password: process.env.DB_PASSWORD, // Password database
  database: process.env.DB_NAME, // Nama database
});

// Cek koneksi ke database
// pool.getConnection((err, connection) => {
//   // if (err) {
//   //   console.error("❌ Database connection failed:", err.message);
//   // } else {
//   //   console.log("✅ Connected to the database ecommerce_db.");
//   //   connection.release(); // Lepaskan koneksi setelah pengecekan
//   // }
//   try {

//   } catch (error) {

//   }
// });

async function checkConnection() {
  try {
    await pool.getConnection();
    console.log("✅ Connected to the database ecommerce_db");
  } catch (error) {
    console.log("❌ Database connection failed:", err.message);
  }
}

module.exports = { pool, checkConnection };
