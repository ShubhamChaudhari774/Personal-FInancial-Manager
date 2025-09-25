import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10
});

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as ok');
    res.json({ status: 'ok', db: rows[0].ok === 1 });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const password_hash = await bcrypt.hash(password, 10);
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );
    const user = { id: result.insertId, email };
    res.json({ token: signToken(user), user: { id: user.id, name, email } });
  } catch (e) {
    if (e && e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already in use' });
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Transactions CRUD
app.get('/api/transactions', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const [rows] = await pool.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [userId]);
  res.json(rows);
});

app.post('/api/transactions', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { category, amount, date, description } = req.body;
  if (!category || !amount || !date) return res.status(400).json({ error: 'Missing fields' });
  const [result] = await pool.execute(
    'INSERT INTO transactions (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
    [userId, category, amount, date, description || null]
  );
  const [rows] = await pool.execute('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

app.put('/api/transactions/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { category, amount, date, description } = req.body;
  const [existing] = await pool.execute('SELECT * FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
  if (existing.length === 0) return res.status(404).json({ error: 'Not found' });
  await pool.execute(
    'UPDATE transactions SET category=?, amount=?, date=?, description=? WHERE id=? AND user_id=?',
    [category, amount, date, description || null, id, userId]
  );
  const [rows] = await pool.execute('SELECT * FROM transactions WHERE id = ?', [id]);
  res.json(rows[0]);
});

app.delete('/api/transactions/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const [existing] = await pool.execute('SELECT * FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
  if (existing.length === 0) return res.status(404).json({ error: 'Not found' });
  await pool.execute('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
  res.status(204).send();
});

// Dashboard and Analytics
app.get('/api/dashboard', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const [byCategory] = await pool.execute(
    'SELECT category, SUM(amount) as total FROM transactions WHERE user_id=? GROUP BY category',
    [userId]
  );
  const [byMonth] = await pool.execute(
    "SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total FROM transactions WHERE user_id=? GROUP BY month ORDER BY month",
    [userId]
  );
  res.json({ byCategory, byMonth });
});

app.get('/api/analytics', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.execute(
      'SELECT category, amount, date FROM transactions WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)',
      [userId]
    );
    const response = await fetch(`${process.env.AI_SERVICE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactions: rows })
    });
    const json = await response.json();
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: 'AI service error' });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`Backend listening on ${port}`));
