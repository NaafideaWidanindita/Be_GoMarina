const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {getAllProducts,getProductById,createProduct,deleteProduct} = require('../Controller/product');

const productRoutes = express.Router();

const uploadDir = path.join(__dirname, '../uploads/imagesproduct');

// Pastikan folder upload ada dan dapat diakses
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage untuk multer
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

const upload = multer({ storage: storage });

productRoutes.get('/products', getAllProducts);
productRoutes.get('/products/:id', getProductById);
productRoutes.post('/products', upload.single('image'), createProduct);
productRoutes.delete('/products/:id', deleteProduct);

module.exports = productRoutes;
