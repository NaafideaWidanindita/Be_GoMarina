const {query} = require("../Database/db");
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

    // // Jika login berhasil, buat dan kirimkan token JWT
    // const token = jwt.sign(
    //   { userId: user.id, username: user.username, role: user.role },
    //   process.env.JWT_SECRET, // Pastikan Anda sudah menambahkan JWT_SECRET di .env
    //   { expiresIn: '1h' } // Token berlaku selama 1 jam
    // );

    return res.status(200).json({
      success: true, 
      message: 'Login successful',
      // token: token, // mengirimkan token
      user: { 
        id: user.id,
        username: user.username,
        role: user.role,
        telp: user.telp,
        password: user.password,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};