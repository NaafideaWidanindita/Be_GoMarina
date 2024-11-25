const { query } = require("../Database/db");
const multer = require("multer");
const path = require("path");

async function receiveFileUpload(req, res, next) {
    console.log(req.body);

    const file = req.file;
    console.log(file);

    if (file.mimetype !== "image/jpg" && file.mimetype !== "image/png") {
        deleteFile(file.path);
        return res.status(400).json("Image type invalid!");
    }

    try {
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json("Something went wrong!");
    }
}

const tambahPayment = async (req, res) => {
    const { image, option, status } = req.body;

    try {
        await query(
            `INSERT INTO payment (image, option, status) VALUES(?, ?, ?)`,
            [image, option, status]
        );
        return res.status(200).json({
            msg: "Penambahan payment berhasil!",
            data: {
                ...req.body,
            },
        });
    } catch (error) {
        console.error("Penambahan payment gagal", error);
        return res.status(500).json({ msg: "Penambahan payment gagal" });
    }
};

const ambilDataPayment = async (req, res) => {
    try {
        const result = await query(`SELECT * FROM payment`);
        return res.status(200).json({ msg: "Ambil payment berhasil", data: result });
    } catch (error) {
        console.error("Ambil payment gagal", error);
    }
};

const perbaruiPayment = async (req, res) => {
    const { image, option, status } = req.body;
    const { id } = req.params;
    try {
        const result = await query(
            `UPDATE payment SET image = ?, option = ?, status = ? WHERE id = ?`,
            [image, option, status, id]
        );
        return res.status(200).json({
            msg: "Perbarui payment berhasil!",
            data: {
                ...req.body,
            },
        });
    } catch (error) {
        console.error("Perbarui payment gagal", error);
    }
};

const hapusPayment = async (req, res) => {
    const { id } = req.params;
    try {
        await query("DELETE FROM payment WHERE id = ?", [id]);
        return res.status(200).json({ msg: "Hapus payment berhasil!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Hapus payment gagal" });
    }
};

const ambilPaymentId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query(`SELECT * FROM payment WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan data ID berhasil!", data: result });
    } catch (error) {
        console.error("Ambil data gagal", error);
    }
};

const ubahStatusPayment = async (req, res) => {
    const { id } = req.params; // ID pembayaran yang ingin diubah
    const { status } = req.body; // Status baru yang akan diubah

    try {
        // Perbarui status pembayaran berdasarkan ID
        const result = await query(
            `UPDATE payment SET status = ? WHERE id = ?`,
            [status, id]
        );

        // Jika ID tidak ditemukan
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Payment tidak ditemukan" });
        }

        return res.status(200).json({
            msg: "Status payment berhasil diubah",
            data: { id, status },
        });
    } catch (error) {
        console.error("Gagal mengubah status payment", error);
        return res.status(500).json({ msg: "Gagal mengubah status payment" });
    }
};

module.exports = {
    tambahPayment,
    ambilDataPayment,
    perbaruiPayment,
    hapusPayment,
    ambilPaymentId,
    ubahStatusPayment,
    receiveFileUpload
};