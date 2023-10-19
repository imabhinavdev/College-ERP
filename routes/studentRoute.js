const express = require('express');
const supabase = require('../client');
const path = require('path')
const studentController = require('../controllers/studentController')
const router = express.Router()

router.get('/dashboard', (req, res) => {
    res.render('student/studentDashboard.ejs')
})


module.exports = router;
