const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const supabase = require('../client');
const bcrypt = require('bcrypt');





const login = async function login(req, res) {
    console.log(req.body);
    email = req.body.username
    password = req.body.password
    console.log(email, password);

    try {
        const { data, error } = await supabase
            .from('Users')
            .select()
            .eq('Email', email);

        if (error) {
            console.log(error);
            res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/auth/login";</script>`);
        } else if (data.length === 0) {

            res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/auth/login";</script>`);
        } else {
            const dbpass = data[0].Password;
            const userR = data[0].User;
            console.log(userR);

            bcrypt.compare(password, dbpass, function (err, result) {
                if (err) {
                    console.error(err);
                } else if (result) {
                    res.cookie('erpLoggedin', "Logged In", {
                        httpOnly: true,
                        secure: true,
                    });
                    res.cookie('erpUser', userR, {
                        httpOnly: true,
                        secure: true,
                    });
                    if (userR == 1) {

                        res.redirect('/admin/dashboard');
                    }
                    else if (userR == 2) {

                        res.redirect('/faculty/dashboard');

                    }
                    else if (userR == 3) {

                        res.redirect('/student/dashboard');

                    }
                } else {
                    res.send(`<script>alert("Login failed. Please check your credentials.");
                     window.location.href = "/auth/login";</script>`);
                }
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// const login = async function login(req, res) {
//     console.log(req.body);
//     email = req.body.username
//     password = req.body.password
//     console.log(email, password);

//     const { data, session, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//     })

//     if (error) {
//         console.log(error);
//         res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/";</script>`);


//     }
//     else {
//         console.log(data.session.access_token);
//         res.cookie('supabase_token', data.session.access_token, {
//             httpOnly: true,
//             secure: true, // Set to true if using HTTPS
//         });
//         res.redirect('/dashboard')

//     }
// }
const logout = async function logout(req, res) {
    res.clearCookie('erpLoggedin');
    res.redirect('/');
    console.log("Logged Out !!!!");
}


module.exports = { login, logout }