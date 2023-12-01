const express = require('express')
const db = require('../Model/LoginUsersDB')


const router = express.Router()

// check user password
router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
      const [passwordDB] = await db.query('SELECT password FROM users WHERE email = ? ',  email);

      if(!(password == passwordDB[0].password)){
        console.error('INVALID CREDENTIALS');
        res.status(500).send('INVALID CREDENTIALS');
        return -1;
      }

    //   res.redirect('../Users/home')
      res.redirect('https://www.google.com/')

      res.status(201).send('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).send('Internal Server Error');
    }

  });

  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const [results] = await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?)', [name, email, password]);
      res.status(201).send('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;