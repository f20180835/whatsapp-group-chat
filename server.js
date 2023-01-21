const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'whatsapp',
  connectionLimit: 15
});

const app = express();
app.use(bodyParser.json());

app.get('/messages', async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(`SELECT * FROM Messages LIMIT ${limit} OFFSET ${offset}`);
        connection.release();
        return res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

app.post('/messages', async (req, res) => {
    const { groupId, userId, messageText } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO Messages SET ?', { groupId, userId, messageText, createdAt: new Date() });
        connection.release();
        return res.json({ message: 'Message created' });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
