const {query} = require("../Database/db");

const tambahCartItem = async(req,res) => {
    const{jumlah, price} = req.body;
    try {
        await query(`INSERT INTO cart_item (jumlah, price) VALUES(?, ?)`, [jumlah, price]);
        return res.status(200).json({
            msg: "Penambahan cart berhasil!",
        data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Penambahan cart gagal", error);
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
    tambahCartItem,
    ambilDataCartItem,
    perbaruiCartItem,
    hapusCartItem,
    ambilCartItemId
}