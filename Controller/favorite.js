const { query } = require("../Database/db"); 

const addFavorite = async (req, res) => {
    try {
        const { role_id, product_id } = req.params;

        if (!role_id || !product_id) {
            return res.status(400).json({
                message: 'role_id dan product_id wajib diisi.',
            });
        }

        const checkQuery = `
            SELECT isFavorite FROM favorite 
            WHERE role_id = ? AND product_id = ?
        `;
        const [existingData] = await query(checkQuery, [role_id, product_id]);

        if (existingData) {
            const newIsFavorite = !existingData.isFavorite;
            const updateQuery = `
                UPDATE favorite 
                SET isFavorite = ?, updatedAt = CURRENT_TIMESTAMP 
                WHERE role_id = ? AND product_id = ?
            `;
            await query(updateQuery, [newIsFavorite, role_id, product_id]);

            return res.status(200).json({
                message: `isFavorite berhasil diperbarui menjadi ${newIsFavorite}.`,
                data: {
                    role_id,
                    product_id,
                    isFavorite: newIsFavorite
                }
            });
        } else {
            const insertQuery = `
                INSERT INTO favorite (role_id, product_id, isFavorite, createdAt, updatedAt)
                VALUES (?, ?, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            `;
            const result = await query(insertQuery, [role_id, product_id]);

            if (result.affectedRows > 0) {
                return res.status(201).json({
                    message: 'Favorite berhasil ditambahkan dengan isFavorite = true.',
                    data: {
                        role_id,
                        product_id,
                        isFavorite: true
                    }
                });
            } else {
                return res.status(400).json({
                    message: 'Gagal menambahkan favorite.',
                });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan favorite.',
            error: error.message,
        });
    }
};

// Produk dengen Favorite
const getFavoriteProducts = async (req, res) => {
  const { role_id } = req.query; 

  if (!role_id) {
    return res.status(400).json({
      success: false,
      message: "role_id is required!"
    });
  }

  try {
    const products = await query('SELECT * FROM product');
    const favorites = await query('SELECT product_id, isFavorite FROM favorite WHERE role_id = ? AND isFavorite = 1', [role_id]);
    const favoriteMap = new Map(favorites.map(fav => [fav.product_id, fav.isFavorite]));
    
    // Filter produk hanya yang isFavorite = true
    const productsWithIsFavorite = products
      .filter(product => favoriteMap.get(product.id) === 1) // Filter produk dengan isFavorite = true
      .map(product => ({
        ...product,
        imageUrl: product.image ? `http://localhost:5000/product/${product.image}` : "",
        isFavorite: favoriteMap.get(product.id) === 1 // true jika isFavorite = 1, false jika 0
      }));

    res.status(200).json({
      success: true,
      message: "Favorite products retrieved successfully!",
      data: productsWithIsFavorite
    });
  } catch (error) {
    console.error("Error retrieving favorite products:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving favorite products",
      error: error.message
    });
  }
};
  
module.exports = {
    addFavorite,
    getFavoriteProducts
};
