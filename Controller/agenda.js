const {query} = require("../Database/db");

const tambahAgenda = async(req,res) => {
    try {
        const { name, deskripsi } = req.body;
        if (!name || !deskripsi) {
            return res.status(400).json({ msg: "Field 'name' atau 'deskripsi' tidak boleh kosong!" });
        }
        const image = req.file ? `/uploads/images/${req.file.filename}` : null;

        await query(`INSERT INTO agenda (name, deskripsi, image) VALUES(?, ?, ?)`, [name, deskripsi, image]);

        return res.status(200).json({
            msg: "Penambahan agenda berhasil!",
            data: { name, deskripsi, image },
        });
    } catch (error) {
        console.log("Penambahan agenda gagal", error);
    }
};

const ambilDataAgenda = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM agenda`);
        return res.status(200).json({ msg: "Ambil agenda berhasil", data: result });
    } catch (error) {
        console.log("Ambil agenda gagal", error);
    }
};

const perbaruiAgenda = async (req,res) => {
    const{name, deskripsi, image} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE agenda SET name = ?, deskripsi = ?, image = ? WHERE id = ?`, [name, deskripsi, image, id]);
        return res.status(200).json({ 
            msg: "Perbarui agenda berhasil!", 
            data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Perbarui agenda gagal", error);
    }
};

const hapusAgenda = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM agenda WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus agenda berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus agenda gagal" });
    }
};

const ambilAgendaId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM agenda WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

module.exports = {
    tambahAgenda,
    ambilDataAgenda,
    perbaruiAgenda,
    hapusAgenda,
    ambilAgendaId
}