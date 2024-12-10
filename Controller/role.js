const {query} = require("../Database/db");
const bcrypt = require("bcrypt");

// Get User by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const [rows] = await query('SELECT * FROM role WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ success: true, data: rows});
  } catch (error) {
    res.status(500).json({ success: false, message: 'User tidak ditemukan', error });
  }
};
