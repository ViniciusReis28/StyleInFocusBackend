const db = require('../config/database');

const getAllUsers = async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
};

module.exports = {
    getAllUsers
};
