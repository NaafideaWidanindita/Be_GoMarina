const express = require('express');
const path = require('path');
const productModel = require('../models/productModel');
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
    // const products = await productModel.getAllproducts();
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk menambahkan pengguna baru
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file.filename)
    try {
      const newProduct = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        stok: req.body.stok,
        deskripsi: req.body.deskripsi,
        satuan : req.body.satuan,
        image: req.file.filename, // Simpan path file yang di-upload
      };
      const result = await productModel.createProduct(newProduct);
      res.status(201).json({ id: result.insertId, ...newProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        stok: req.body.stok,
        deskripsi: req.body.deskripsi,
        satuan: req.body.satuan,
      };
  
      const result = await productModel.updateProduct(productId, updatedProduct);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(201).json({ message: 'Product updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Panggil fungsi deleteProduct dari model
      const result = await productModel.deleteProduct(productId);
      res.status(200).json(result); // Kirimkan pesan sukses
    } catch (error) {
      res.status(400).json({ message: error.message }); // Kirimkan pesan error
    }
  });

module.exports = router;
