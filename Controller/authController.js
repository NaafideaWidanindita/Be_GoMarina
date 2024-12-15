const { query } = require("../Database/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Register User or Admin
exports.signUp = async (req, res) => {
  const { username, password, name, telp, role } = req.body;

  if (!name || !username || !password || !telp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await query(
      'INSERT INTO role (username, password, name, telp, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, name, telp, role || "user", new Date(), new Date()]
    );

    const role_id = userResult.insertId;

    await query(
      'INSERT INTO address (role_id, provinsi, city, kecamatan, postalCode, street, detail, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [role_id, "Riau", "Batam", "", "", "", "", new Date(), new Date()]
    );

    return res.status(201).json({
      success: true,
      message: "User and address created successfully!",
      user: {
        id: role_id,
        username,
        name,
        telp,
        role: role || "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      address: {
        role_id,
        provinsi: "Riau",
        city: "Batam",
        kecamatan: "",
        postalCode: "",
        street: "",
        detail: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user.", error });
  }
};

// Sign In
exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [user] = await query('SELECT * FROM role WHERE username = ?', [username]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username/password' });
    }

    // Generate Access Token (1 hour expiry)
    const accessToken = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }      
    );

    // Generate Refresh Token (1 month expiry)
    const refreshToken = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_REFRESH_SECRET, 
      { expiresIn: '30d' }  // Refresh token expires in 30 days
    );

    const cookieOptions = {
      httpOnly: true,  // Secure cookie, cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production',  // Only for HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000  // Cookie valid for 30 days
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    return res.status(200).json({
      success: true, 
      message: 'Login successful',
      accessToken,  // Send Access Token
      user: { 
        id: user.id,
        username: user.username,
        role: user.role,
        telp: user.telp
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};



// Update User
exports.updateUser = async (req, res) => {
  const { username, password, name, telp } = req.body;
  const { id } = req.params;

  if (!id || (!username && !password && !name && !telp)) {
    return res.status(400).json({ message: 'ID and at least one field to update are required' });
  }

  let fields = [];
  let values = [];

  if (username) {
    fields.push("username = ?");
    values.push(username);
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    fields.push("password = ?");
    values.push(hashedPassword);
  }
  if (name) {
    fields.push("name = ?");
    values.push(name);
  }
  if (telp) {
    fields.push("telp = ?");
    values.push(telp);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: 'At least one field must be provided to update' });
  }

  values.push(id);

  try {
    await query(
      `UPDATE role SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return res.status(200).json({ success: true, message: "User updated successfully!" });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ success: false, message: "Error updating user.", error });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { userId } = req.user; // Assuming you are using JWT and have the user ID available

  try {
    await query('DELETE FROM role WHERE id = ?', [userId]);
    return res.status(200).json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user.", error });
  }
};
