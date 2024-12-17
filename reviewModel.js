const db = require('../db');

// Fungsi untuk mendapatkan semua pengguna
const getAllReviews = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM reviews';
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
const getReviewById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM reviews WHERE id = ?';
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
const createReview = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO reviews SET ?';
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
const deleteReview = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM reviews WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err); // Jika error, kembalikan error
        } else {
          if (results.affectedRows === 0) {
            // Jika tidak ada baris yang terpengaruh, produk tidak ditemukan
            reject(new Error('review not found'));
          } else {
            resolve({ message: 'review deleted successfully' });
          }
        }
      });
    });
  };

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
};
