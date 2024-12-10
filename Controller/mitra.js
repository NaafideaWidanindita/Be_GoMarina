const {query} = require("../Database/db");

const tambahMitra = async(req,res) => {
    const{name, image} = req.body;
    try {
        await query(`INSERT INTO mitra (name, image) VALUES(?, ?)`, [name, image]);
        return res.status(200).json({
            msg: "Penambahan mitra berhasil!",
        data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Penambahan mitra gagal", error);
    }
};

const ambilDataMitra = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM mitra`);
        return res.status(200).json({ msg: "Ambil mitra berhasil", data: result });
    } catch (error) {
        console.log("Ambil mitra gagal", error);
    }
};

const perbaruiMitra = async (req,res) => {
    const{name, image} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE mitra SET name = ?, image = ? WHERE id = ?`, [name, image, id]);
        return res.status(200).json({ 
            msg: "Perbarui mitra berhasil!", 
            data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Perbarui mitra gagal", error);
    }
};

const hapusMitra = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM mitra WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus mitra berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus mitra gagal" });
    }
};

const ambilMitraId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM mitra WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

module.exports = {
    tambahMitra,
    ambilDataMitra,
    perbaruiMitra,
    hapusMitra,
    ambilMitraId
}