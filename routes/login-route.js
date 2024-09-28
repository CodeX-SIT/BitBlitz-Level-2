// var express = require('express');

// var router = express.Router();
// var db=require('../database');
// var app = express();
// app.use(express.static('public'))
// app.use('/css',express.static(__dirname + 'public/css'))
// /* GET users listing. */
// router.get('/login', function(req, res, next) {
//   res.render('login-form.ejs');
// });

// router.post('/login', function(req, res){
//     var emailAddress = req.body.email_address;
//     var password = req.body.password;

//     var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
//     db.query(sql, [emailAddress, password], function (err, data, fields) {
//         if(err) throw err
//         if(data.length>0){
//             req.session.loggedinUser= true;
//             req.session.emailAddress= emailAddress;
//             res.redirect('/userInfo');
//             // res.redirect('/blockchain');
//         }else{
//             res.render('login-form.ejs',{alertMsg:"Your Email Address or password is wrong"});
//         }
//     })

// })

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/user'); // Adjust the path accordingly
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Perform session handling or JWT token generation here
        req.session.userId = user._id; // Example session handling
        res.send('Logged in successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
