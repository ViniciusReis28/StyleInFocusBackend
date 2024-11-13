const { Pool } = require('pg');

const pool = new Pool({
    connectionString: `postgresql://login_owner:dpKcyaM1Wlk6@ep-damp-king-a8x4mk3u-pooler.eastus2.azure.neon.tech/login?sslmode=require`,
});

module.exports = pool;

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexão ao banco de dados bem-sucedida!');
        client.release();
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
};

testConnection();