const db = require('../db');

// Fungsi untuk mendapatkan semua pengguna
const getAllPayments = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM payments';
    db.query(sql, (err, results) => {
      if (err) {
        reject(err); // Jika error, kembalikan error
      } else {
        resolve(results); // Jika sukses, kembalikan hasil
      }
    });
  });
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
const getPaymentById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM payments WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Ambil data pertama (karena ID unik)
      }
    });
  });
};

// Fungsi untuk menambahkan pengguna baru
const createPayment = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO payments SET ?';
    db.query(sql, data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Fungsi untuk menghapus produk berdasarkan ID
const deletePayment = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM payments WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err); // Jika error, kembalikan error
        } else {
          if (results.affectedRows === 0) {
            // Jika tidak ada baris yang terpengaruh, produk tidak ditemukan
            reject(new Error('payment not found'));
          } else {
            resolve({ message: 'payment deleted successfully' });
          }
        }
      });
    });
  };

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  deletePayment,
};
