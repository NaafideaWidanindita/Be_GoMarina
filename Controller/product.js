const { query } = require("../Database/db");

// Fungsi untuk mendapatkan semua produk
const getAllProducts = async (req, res) => {
    try {
      const results = await query('SELECT * FROM product');
      const productsWithImageUrl = results.map(product => ({
        ...product,
        imageUrl: product.image ? `http://localhost:5000/product/${product.image}` : ""
      }));
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully!",
        data: productsWithImageUrl
      });
    } catch (error) {
      console.error("Error retrieving products:", error.message);
      res.status(500).json({
        success: false,
        message: "Error retrieving products",
        error: error.message
      });
    }
  };
  

// Fungsi untuk mendapatkan produk berdasarkan ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const [product] = await query('SELECT * FROM product WHERE id = ?', [productId]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const productWithImageUrl = {
      ...product,
      imageUrl: product.image ? `http://localhost:5000/product/${product.image}` : ""
    };
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully!",
      data: productWithImageUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error.message
    });
  }
};

// Fungsi untuk menambahkan produk baru
const createProduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is required"
    });
  }

  const { name, description, price, stok } = req.body;
  const image = req.file.filename;

  if (!name || !description || !price || !stok) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const result = await query(
      'INSERT INTO product (name, image, description, price, stok, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, image, description, price, stok, new Date(), new Date()]
    );
  
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: {
        id: result.insertId, // result.insertId akan ada jika query berhasil
        name,
        image,
        description,
        price,
        stok
      }
    });
  } catch (error) {
    console.error("Query Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message
    });
  }
  
};

// Fungsi untuk menghapus produk berdasarkan ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await query('DELETE FROM product WHERE id = ?', [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: { id: productId }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message
    });
  }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
}