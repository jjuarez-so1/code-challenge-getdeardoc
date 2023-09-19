const pool = require('../../db/dbConfig')

async function registerUser(req, res) {
    const { username, password, email } = req.body;
  
    try {
      const [existingUsers] = await pool.query(
        'SELECT * FROM Users WHERE username = ? OR email = ?',
        [username, email]
      );
  
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
  
      await pool.query('INSERT INTO Users (username, password, email) VALUES (?, ?, ?)', [
        username,
        password,
        email,
      ]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    registerUser,
  };