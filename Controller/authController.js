const { query } = require("../Database/db");
const bcrypt = require("bcrypt");

// Register User or Admin
exports.signUp = async (req, res) => {
  const { username, password, name, telp, role } = req.body;

  if (!name || !username || !password || !telp) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await query(
      'INSERT INTO role (username, password, name, telp, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, name, telp, role || "user", new Date(), new Date()]
    );

    return res.status(201).json({ success: true, message: "User created successfully!" });
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

    // If login is successful, you can create a token here if needed
    // const token = jwt.sign(
        //   { userId: user.id, username: user.username, role: user.role },
    //   process.env.JWT_SECRET, // Pastikan Anda sudah menambahkan JWT_SECRET di .env
    //   { expiresIn: '1h' } // Token berlaku selama 1 jam
    // );

    return res.status(200).json({
      success: true, 
      message: 'Login successful',
      // token: token, // If you're returning a token
      user: { 
        id: user.id,
        username: user.username,
        role: user.role,
        telp: user.telp,
        password: user.password
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};



// Update User
exports.updateUser = async (req, res) => {
  console.log("Request params:", req.params);
  console.log("Request body:", req.body);

  const { username, password, name, telp } = req.body;
  const { id } = req.params;

  if (!id || (!username && !password && !name && !telp)) {
    return res.status(400).json({ message: 'ID and at least one field to update are required' });
  }

  // Prepare the update query and values
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

  // If no fields are provided to update, return error
  if (fields.length === 0) {
    return res.status(400).json({ message: 'At least one field must be provided to update' });
  }

  // Add the user ID to the values for the WHERE clause
  values.push(id);

  try {
    // Execute the update query
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
