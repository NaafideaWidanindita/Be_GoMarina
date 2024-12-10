const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images"); // Folder untuk menyimpan file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nama file unik
    },
});

// Filter jenis file yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("File harus berupa gambar (JPEG, JPG, PNG)"));
    }
};

// Middleware multer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum ukuran file: 5MB
    fileFilter,
});

module.exports = upload;