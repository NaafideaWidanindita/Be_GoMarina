const {query} = require("../Database/db");

const tambahKonten = async(req,res) => {
    const{title, descriptionGarden, descriptionAdd, visi, misi, address, contact} = req.body;
    if (!title || !descriptionGarden || !descriptionAdd || !visi || !misi || !address || !contact) {
        return res.status(400).json({ msg: "Semua field wajib diisi!" });
    }
    try {
        await query(`INSERT INTO konten (title, description_garden, description_add, visi, misi, address, contact) VALUES(?, ?, ?, ?, ?, ?, ?)`, [title, descriptionGarden, descriptionAdd, visi, misi, address, contact]);
        return res.status(200).json({
            msg: "Penambahan konten berhasil!",
        data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Penambahan konten gagal", error);
    }
};

const ambilDataKonten = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM konten`);
        return res.status(200).json({ msg: "Ambil konten berhasil", data: result });
    } catch (error) {
        console.log("Ambil konten gagal", error);
    }
};

const perbaruiKonten = async (req,res) => {
    const{title, descriptionGarden, descriptionAdd, visi, misi, address, contact} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE konten SET title = ?, description_garden = ?, description_add = ?, visi = ?, misi = ?, address = ?, contact = ? WHERE id = ?`, [title, descriptionGarden, descriptionAdd, visi, misi, address, contact, id]);
        return res.status(200).json({ 
            msg: "Perbarui konten berhasil!", 
            data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Perbarui konten gagal", error);
    }
};

const hapusKonten = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM konten WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus konten berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus konten gagal" });
    }
};

const ambilKontenId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM konten WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

module.exports = {
    tambahKonten,
    ambilDataKonten,
    perbaruiKonten,
    hapusKonten,
    ambilKontenId
}