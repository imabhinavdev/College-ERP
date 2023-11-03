const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');

const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const supabase = require('../client');
const faculty = require('../models/faculty')




exports.login = async (req, res) => {
    console.log(req.body);
    email = req.body.username
    password = req.body.password
    console.log(email, password);

    try {
        const user = await faculty.findOne({ email: email })

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
                res.cookie('erpUser', "isFaculty", {
                    httpOnly: true,
                    secure: true,
                });
                res.cookie('erpUserName', username, {
                    httpOnly: true,
                    secure: true,
                });
                res.redirect('/faculty/dashboard')

            } else {
                console.log('Password is incorrect');
                res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/";</script>`);

            }
        });
    }
    catch (error) {
        res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/";</script>`);

        console.error('An error occurred:', error);
    }
}
exports.markattendance = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()
            .order('Enrollment_No', { ascending: true });



        if (error) {
            console.log(error);
        } else {
            console.log(data);
            res.render('faculty/markattendance.ejs', { Data: data })
        }

    } catch (error) {

    }
}

exports.savemarkattendance = async (req, res) => {
    console.log(req.body);
    res.send(req.body)
}