const {query} = require("../Database/db");

const tambahGaleri = async (req, res) => {
    try {
        const { option } = req.body;
        if (!option) {
            return res.status(400).json({ msg: "Field 'option' tidak boleh kosong!" });
        }

        const image = req.file ? `/uploads/images/${req.file.filename}` : null;

        await query(`INSERT INTO galeri (image, option) VALUES(?, ?)`, [image, option]);

        return res.status(200).json({
            msg: "Penambahan galeri berhasil!",
            data: { option, image },
        });
    } catch (error) {
        console.log("Penambahan galeri gagal", error);
        return res.status(500).json({ msg: "Penambahan galeri gagal!" });
    }
};

const ambilDataGaleri = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM galeri`);
        return res.status(200).json({ msg: "Ambil galeri berhasil", data: result });
    } catch (error) {
        console.log("Ambil galeri gagal", error);
    }
};

const perbaruiGaleri = async (req,res) => {
    const{image, option} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE galeri SET image = ?, option = ? WHERE id = ?`, [image, option, id]);
        return res.status(200).json({ 
            msg: "Perbarui galeri berhasil!", 
            data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Perbarui galeri gagal", error);
    }
};

const hapusGaleri = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM galeri WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus galeri berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus galeri gagal" });
    }
};

const ambilGaleriId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM galeri WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

module.exports = {
    tambahGaleri,
    ambilDataGaleri,
    perbaruiGaleri,
    hapusGaleri,
    ambilGaleriId
}