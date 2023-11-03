const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');
const student = require('../models/student')

exports.login = async (req, res) => {
    console.log(req.body);
    email = req.body.username
    password = req.body.password
    console.log(email, password);

    try {
        const user = await student.findOne({ email: email })

        console.log(user);
        dbpass = user.password
        username = user.name
        bcrypt.compare(password, dbpass, function (err, result) {
            if (err) {
                console.error(err);
            } else if (result) {
                res.cookie('erpLoggedin', "Logged In", {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie('erpUser', "isStudent", {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie('erpUserName', username, {
                    httpOnly: true,
                    secure: true,
                });
                res.redirect('/student/dashboard')

            } else {
                console.log('Password is incorrect');
                res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/auth/admin/login";</script>`);

            }
        });
    }
    catch (error) {
        res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/auth/admin/login";</script>`);

        console.error('An error occurred:', error);
    }
}