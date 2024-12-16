const db = require('../db');

// Fungsi untuk mendapatkan semua pengguna
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products';
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
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
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
const createProduct = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateProduct = (productId, data) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE products SET ? WHERE id = ?';
    db.query(sql, [data, productId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Fungsi untuk menghapus produk berdasarkan ID
const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM products WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err); // Jika error, kembalikan error
        } else {
          if (results.affectedRows === 0) {
            // Jika tidak ada baris yang terpengaruh, produk tidak ditemukan
            reject(new Error('Product not found'));
          } else {
            resolve({ message: 'Product deleted successfully' });
          }
        }
      });
    });
  };

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
};
