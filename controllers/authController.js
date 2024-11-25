const db = require("../models/db");
const bcrypt = require("bcrypt");

// Register User or Admin
exports.signUp = async (req, res) => {
  const { username, password, full_name, phone, email, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (username, password, full_name, phone, email, role) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, full_name, phone, email, role || "user"]
    );

    res.status(201).json({ success: true, message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user.", error });
  }
};

// Sign In
exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute(`SELECT * FROM users WHERE username = ?`, [username]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    res.status(200).json({ success: true, message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error during login.", error });
  }
};
