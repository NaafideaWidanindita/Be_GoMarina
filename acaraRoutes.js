const express = require('express');
const path = require('path');
const acaraModel = require('../models/acaraModel');
const multer = require('multer')
const fs = require('fs');

const router = express.Router();

// Tentukan direktori penyimpanan file
const uploadDir = path.join(__dirname, '../uploads/acara');

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
    // const acaras = await acaraModel.getAllacaras();
    const acaras = await acaraModel.getAllAcaras();
    res.json(acaras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const acara = await acaraModel.getAcaraById(req.params.id);
    if (!acara) {
      res.status(404).json({ error: 'acara not found' });
    } else {
      res.json(acara);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk menambahkan pengguna baru
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file.filename)
    try {
      const newacara = {
        nama_acara: req.body.nama_acara,
        tanggal: req.body.tanggal,
        deskripsi: req.body.deskripsi,
        image: '/acara/'+req.file.filename, // Simpan path file yang di-upload
      };
      const result = await acaraModel.createAcara(newacara);
      res.status(201).json({ id: result.insertId, ...newacara });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const acaraId = req.params.id;
      const updatedacara = {
        nama_acara: req.body.nama_acara,
        deskripsi: req.body.deskripsi,
        tanggal: req.body.tanggal,
      };
  
      const result = await acaraModel.updateAcara(acaraId, updatedacara);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'acara not found' });
      }
  
      res.status(201).json({ message: 'acara updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    const acaraId = req.params.id;
  
    try {
      // Panggil fungsi deleteacara dari model
      const result = await acaraModel.deleteAcara(acaraId);
      res.status(200).json(result); // Kirimkan pesan sukses
    } catch (error) {
      res.status(400).json({ message: error.message }); // Kirimkan pesan error
    }
  });

module.exports = router;
