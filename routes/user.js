var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt'); // To hash passwords
var db = require('../database'); // Assuming you're using MySQL

// USER SIGNUP (REGISTER)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database
        var sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], function (err, data) {
            if (err) throw err;
            res.send('User registered successfully!');
        });
    } catch (error) {
        res.status(500).send('Error in registration');
    }
});

// USER LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        var sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], async function (err, data) {
            if (err) throw err;

            if (data.length > 0) {
                const user = data[0];

                // Compare the password with hashed password
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    // Set user session or token
                    req.session.user = user;
                    res.redirect('/dashboard'); // Redirect to user dashboard
                } else {
                    res.render('login-form.ejs', { alertMsg: 'Invalid credentials' });
                }
            } else {
                res.render('login-form.ejs', { alertMsg: 'User not found' });
            }
        });
    } catch (error) {
        res.status(500).send('Error in login');
    }
});

module.exports = router;
