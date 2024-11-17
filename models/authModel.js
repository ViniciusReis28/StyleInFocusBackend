const users = []; // Simplesmente em memória para este exemplo.

module.exports = {
    findByEmail: (email) => users.find(user => user.email === email),
    save: (user) => users.push(user)
};