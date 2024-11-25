const multer = require("multer");
const path = require("path");

// Konfigurasi folder penyimpanan
const fileDir = path.join(__dirname, "../../uploads/images/");

// Konfigurasi Multer
const storage = multer.diskStorage({
    // Tentukan folder penyimpanan
    destination: (req, file, cb) => {
        cb(null, fileDir);
    },
    // Tentukan nama file
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});

// Filter untuk tipe file
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Only .png, .jpg, and .jpeg files are allowed!"), false);
    }
    cb(null, true);
};

// Ekspor konfigurasi multer
module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
}).single("file");