const express = require('express');
const path = require('path');
const paymentModel = require('../models/paymentModel');
const multer = require('multer')
const fs = require('fs');

const router = express.Router();

// Tentukan direktori penyimpanan file
const uploadDir = path.join(__dirname, '../uploads');

// Pastikan folder uploads ada, jika tidak ada buat folder
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  // Konfigurasi multer untuk upload file
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Tentukan direktori tujuan upload
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const extension = path.extname(file.originalname); // Menambahkan ekstensi file
      cb(null, `${timestamp}${extension}`);
    }
  });
  

const upload = multer({storage: storage})

// Rute untuk mendapatkan semua pengguna
router.get('/', async (req, res) => {
  try {
    // const payments = await paymentModel.getAllpayments();
    const payments = await paymentModel.getAllPayments();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await paymentModel.getPaymentById(req.params.id);
    if (!payment) {
      res.status(404).json({ error: 'payment not found' });
    } else {
      res.json(payment);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk menambahkan pengguna baru
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file.filename)
    try {
      const newpayment = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        stok: req.body.stok,
        deskripsi: req.body.deskripsi,
        satuan : req.body.satuan,
        image: req.file.filename, // Simpan path file yang di-upload
      };
      const result = await paymentModel.createPayment(newpayment);
      res.status(201).json({ id: result.insertId, ...newpayment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    const paymentId = req.params.id;
  
    try {
      // Panggil fungsi deletepayment dari model
      const result = await paymentModel.deletePayment(paymentId);
      res.status(200).json(result); // Kirimkan pesan sukses
    } catch (error) {
      res.status(400).json({ message: error.message }); // Kirimkan pesan error
    }
  });

module.exports = router;
