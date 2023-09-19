const pool = require('../dbConfig');

async function findUserByUserName(userName, token) {
    const [user] = await pool.query('SELECT * FROM Users WHERE username = ? AND password = ?', [userName, token]);
    return user;
}

module.exports = {
    findUserByUserName,
}
