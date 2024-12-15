const { query } = require("../Database/db");

const tambahPayment = async (req, res) => {
    try {
        const { option, status } = req.body;
        const image = req.file ? `/uploads/images/${req.file.filename}` : null;

        await query(
            `INSERT INTO payment (option, status, image) VALUES (?, ?, ?)`,
            [option, status, image]
        );

        return res.status(200).json({
            msg: "Penambahan payment berhasil!",
            data: { option, status, image },
        });
        
    } catch (error) {
        console.error("Penambahan payment gagal:", error);
        return res.status(500).json({ msg: "Penambahan payment gagal" });
    }
};

const ambilDataPayment = async (req, res) => {
    try {
        const result = await query(`SELECT * FROM payment`);

        return res.status(200).json({ msg: "Ambil payment berhasil", data: result });
    } catch (error) {
        console.error("Ambil payment gagal", error);
        return res.status(500).json({ msg: "Ambil payment gagal" });
    }
};

const perbaruiPayment = async (req, res) => {
    const { image, option, status } = req.body;
    const { id } = req.params;

    try {
        const payment = await query(`SELECT image FROM payment WHERE id = ?`, [id]);
        if (payment.length === 0) {
            return res.status(404).json({ msg: "Payment tidak ditemukan" });
        }

        await query(
            `UPDATE payment SET image = ?, option = ?, status = ? WHERE id = ?`,
            [option, status, image || payment[0].image, id]
        );

        return res.status(200).json({
            msg: "Perbarui payment berhasil!",
            data: {
                ...req.body,
            },
        });
    } catch (error) {
        console.error("Perbarui payment gagal", error);
        return res.status(500).json({ msg: "Perbarui payment gagal" });
    }
};

const hapusPayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await query(`SELECT image FROM payment WHERE id = ?`, [id]);
        if (payment.length === 0) {
            return res.status(404).json({ msg: "Payment tidak ditemukan" });
        }

        await query("DELETE FROM payment WHERE id = ?", [id]);
        return res.status(200).json({ msg: "Hapus payment berhasil!" });
    } catch (error) {
        console.error("Hapus payment gagal", error);
        return res.status(500).json({ msg: "Hapus payment gagal" });
    }
};

module.exports = {
    tambahPayment,
    ambilDataPayment,
    perbaruiPayment,
    hapusPayment,
};
