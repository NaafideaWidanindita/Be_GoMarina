const express = require('express');
const path = require('path');
const product = require('../Controller/product');
const multer = require('multer')
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads/imagesproduct');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname); 
        cb(null, `${timestamp}${extension}`);
    }
});

const upload = multer({storage: storage})

router.get('/', async (req, res) => {
    try {
    const products = await product.getAllProducts();
    res.json(products);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
    const product = await product.getProductById(req.params.id);
    if (!product) {
        res.status(404).json({ error: 'product not found' });
    } else {
        res.json(product);
    }
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file.filename)
    try {
        const newProduct = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        stok: req.body.stok,
        deskripsi: req.body.deskripsi,
        satuan : req.body.satuan,
        image: req.file.filename, 
        };
        const result = await product.createProduct(newProduct);
        res.status(201).json({ id: result.insertId, ...newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

    router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
        const result = await product.deleteProduct(productId);
        res.status(200).json(result); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

module.exports = router;