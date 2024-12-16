const db = require('../db');

// Fungsi untuk mendapatkan semua pengguna
const getAllAcaras = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM acaras';
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
const getAcaraById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM acaras WHERE id = ?';
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
const createAcara = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO acaras SET ?';
    db.query(sql, data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateAcara = (AcaraId, data) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE acaras SET ? WHERE id = ?';
    db.query(sql, [data, AcaraId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Fungsi untuk menghapus produk berdasarkan ID
const deleteAcara = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM acaras WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err); // Jika error, kembalikan error
        } else {
          if (results.affectedRows === 0) {
            // Jika tidak ada baris yang terpengaruh, produk tidak ditemukan
            reject(new Error('Acara not found'));
          } else {
            resolve({ message: 'Acara deleted successfully' });
          }
        }
      });
    });
  };

module.exports = {
  getAllAcaras,
  getAcaraById,
  createAcara,
  deleteAcara,
  updateAcara
};
