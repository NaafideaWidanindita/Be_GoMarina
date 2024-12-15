const {query} = require("../Database/db");

const tambahFeedback = async(req,res) => {
    const{star, kritikSaran} = req.body;
    try {
        await query(`INSERT INTO feedback (star, kritik_saran) VALUES(?, ?)`, [star, kritikSaran]);
        return res.status(200).json({
            msg: "Penambahan feedback berhasil!",
        data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Penambahan feedback gagal", error);
    }
};

const ambilDataFeedback = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM feedback`);
        return res.status(200).json({ msg: "Ambil feedback berhasil", data: result });
    } catch (error) {
        console.log("Ambil feedback gagal", error);
    }
};

const perbaruiFeedback = async (req,res) => {
    const{star, kritikSaran} = req.body;
    const {id} = req.params;
    try {
        const result = await query(`UPDATE feedback SET star = ?, kritik_saran = ? WHERE id = ?`, [star, kritikSaran, id]);
        return res.status(200).json({ 
            msg: "Perbarui feedback berhasil!", 
            data: {
            ...req.body,
        },
    });
    } catch (error) {
        console.log("Perbarui feedback gagal", error);
    }
};

const hapusFeedback = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM feedback WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus feedback berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus feedback gagal" });
    }
};

const ambilFeedbackId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM feedback WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil data gagal", error);
    }
};

module.exports = {
    tambahFeedback,
    ambilDataFeedback,
    perbaruiFeedback,
    hapusFeedback,
    ambilFeedbackId
}