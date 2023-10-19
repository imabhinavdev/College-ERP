const express = require('express');
const supabase = require('../client');
const path = require('path');
const adminRoute = require('../routes/adminRoute')


const router = express.Router();
const authController = require('../controllers/authController');


router.get('/login', async (req, res) => {
    const token = req.cookies.erpLoggedin; // Retrieve the token from the cookie
    const userR = req.cookies.erpUser;

    console.log("new token", token);
    if (!token) {
        return res.render('login.ejs', { errorMessage: null }); // Redirect to login if no token
    }

    if (userR == 1) {

        res.redirect('/admin/dashboard');
    }
    else if (userR == 2) {

        res.redirect('/faculty/dashboard');

    }
    else if (userR == 3) {

        res.redirect('/student/dashboard');

    }

});

router.post('/login', authController.login);

router.get('/forgotPassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'forgotPassword.html'))
})


router.get('/logout', authController.logout);



const isAdmin = (req, res, next) => {
    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;
    console.log("is authenticated", token);
    console.log("is authenticated", userR);

    if (!token) {
        return res.redirect("/auth/login");
    }
    if (userR == 1) {

        next();
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'html', '404.html'));
    }

};
const isFaculty = (req, res, next) => {
    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;
    console.log("is authenticated", token);
    console.log("is authenticated", userR);

    if (!token) {
        return res.redirect("/auth/login");
    }
    if (userR == 2) {

        next();
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'html', '404.html'));
    }

};
const isStudent = (req, res, next) => {
    const token = req.cookies.erpLoggedin;
    const userR = req.cookies.erpUser;
    console.log("is authenticated", token);
    console.log("is authenticated", userR);

    if (!token) {
        return res.redirect("/auth/login");
    }
    if (userR == 3) {

        next();
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '../public', 'html', '404.html'));
    }

};



module.exports = { router, isAdmin, isFaculty, isStudent };
