const {query} = require("../Database/db");

// Add Cart Item
const addCartItem = async (req, res) => {
    const { role_id, product_id } = req.params;
    const { jumlah } = req.body;

    if (!role_id || !product_id) {
      return res.status(400).json({ message: "Role ID and Product ID are required" });
    }
  
    if (!jumlah) {
      return res.status(400).json({ message: "Jumlah is required" });
    }
  
    try {
        // Ambil harga produk dari database
        const product = await query('SELECT price FROM product WHERE id = ?', [product_id]);
        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const hargaSatuan = product[0].price;
        const totalPrice = jumlah * hargaSatuan;

      const result = await query(
        'INSERT INTO card_item (role_id, product_id, jumlah, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [role_id, product_id, jumlah, totalPrice, new Date(), new Date()]
      );
  
      const insertedCartItem = await query('SELECT * FROM card_item WHERE id = ?', [result.insertId]);
  
      return res.status(201).json({
        success: true,
        message: "Cart item added successfully!",
        cartItem: insertedCartItem[0],
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error adding cart item.", error });
    }
  };
  

const ambilDataCartItem = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM card_item`);
        return res.status(200).json({ msg: "Ambil cart berhasil", data: result });
    } catch (error) {
        console.log("Ambil cart gagal", error);
    }
};

const perbaruiCartItem = async (req,res) => {
    const{jumlah, price} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE card_item SET jumlah = ?, price = ? WHERE id = ?`, [jumlah, price, id]);
        return res.status(200).json({ 
            msg: "Perbarui cart berhasil!", 
            data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Perbarui cart gagal", error);
    }
};

const hapusCartItem = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM card_item WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus cart berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus cart gagal" });
    }
};

const ambilCartItemId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM card_item WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

const ambilCartByRoleId = async (req, res) => {
    const { role_id } = req.params; // Mengambil role_id dari params
    try {
        // Query untuk mengambil data dari tabel card_item dan product
        const result = await query(
            `SELECT 
                card_item.id,
                card_item.role_id,
                card_item.product_id,
                card_item.jumlah,
                card_item.price,
                product.name,
                product.image
            FROM 
                card_item
            INNER JOIN 
                product
            ON 
                card_item.product_id = product.id
            WHERE 
                card_item.role_id = ?`,
            [role_id]
        );

        if (result.length > 0) {
            // Menambahkan URL gambar secara otomatis
            const dataWithImageUrl = result.map(item => {
                const imageUrl = `http://localhost:5000/product/${item.image}`; // Menggabungkan URL dengan nama gambar
                return { ...item, imageUrl }; // Menambahkan imageUrl ke dalam data
            });

            return res.status(200).json({
                msg: "Pengambilan data ID berhasil!",
                data: dataWithImageUrl
            });
        } else {
            return res.status(404).json({
                msg: "Tidak ada item keranjang untuk role_id ini.",
                data: []
            });
        }
    } catch (error) {
        console.error("Ambil data gagal", error);
        return res.status(500).json({
            msg: "Terjadi kesalahan saat mengambil data.",
            error: error.message
        });
    }
};

module.exports = {
    addCartItem,
    ambilDataCartItem,
    perbaruiCartItem,
    hapusCartItem,
    ambilCartItemId,
    ambilCartByRoleId
}