const {query} = require("../Database/db");

// Add Cart Item
const addCartItem = async (req, res) => {
    //roleid dan product id dari url
    const { role_id, product_id } = req.params;
    const { jumlah, price } = req.body;

    if (!role_id || !product_id) {
      return res.status(400).json({ message: "Role ID and Product ID are required" });
    }
  
    if (!jumlah || !price) {
      return res.status(400).json({ message: "Jumlah and Price are required" });
    }
  
    try {
      const result = await query(
        'INSERT INTO card_item (role_id, product_id, jumlah, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [role_id, product_id, jumlah, price, new Date(), new Date()]
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
        const result = await query(`SELECT * FROM cart_item`);
        return res.status(200).json({ msg: "Ambil cart berhasil", data: result });
    } catch (error) {
        console.log("Ambil cart gagal", error);
    }
};

const perbaruiCartItem = async (req,res) => {
    const{jumlah, price} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE cart_item SET jumlah = ?, price = ? WHERE id = ?`, [jumlah, price, id]);
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
        await query("DELETE FROM cart_item WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus cart berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus cart gagal" });
    }
};

const ambilCartItemId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM cart_item WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

module.exports = {
    addCartItem,
    ambilDataCartItem,
    perbaruiCartItem,
    hapusCartItem,
    ambilCartItemId
}