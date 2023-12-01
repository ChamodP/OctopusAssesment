const express = require('express');
const db = require('../Model/LoginUsersDB');

const router = express.Router();

// Create a record
router.post('/create', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [results] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Read all records
router.get('/read', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error reading users:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update a record
router.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    await db.execute('UPDATE users SET name=?, email=? WHERE id=?', [name, email, userId]);
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a record
router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await db.execute('DELETE FROM users WHERE id=?', [userId]);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

