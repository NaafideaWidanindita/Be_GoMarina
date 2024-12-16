const db = require('../db');

// Fungsi untuk mendapatkan semua pengguna
const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM orders';
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
const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM orders WHERE id = ?';
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
const createOrder = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO orders SET ?';
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
const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM orders WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err); // Jika error, kembalikan error
        } else {
          if (results.affectedRows === 0) {
            // Jika tidak ada baris yang terpengaruh, produk tidak ditemukan
            reject(new Error('order not found'));
          } else {
            resolve({ message: 'order deleted successfully' });
          }
        }
      });
    });
  };

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
};
