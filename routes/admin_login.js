var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcrypt');

// Admin Login
router.post('/adlogin', async (req, res) => {
    const { email_address, password } = req.body;

    var sql = 'SELECT * FROM admin WHERE email_address = ?'; // Assuming a table named 'admin' for admin users
    db.query(sql, [email_address], async function (err, data) {
        if (err) throw err;

        if (data.length > 0) {
            const admin = data[0];

            const match = await bcrypt.compare(password, admin.password);
            if (match) {
                req.session.admin = admin;
                res.redirect('/addCandidate'); // Admin dashboard or any protected route
            } else {
                res.render('admin_login.ejs', { alertMsg: 'Invalid credentials' });
            }
        } else {
            res.render('admin_login.ejs', { alertMsg: 'Admin not found' });
        }
    });
});

module.exports = router;
