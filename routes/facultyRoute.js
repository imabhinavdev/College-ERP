const express = require('express');
const supabase = require('../client');
const path = require('path')

const router = express.Router()
const facultyController = require('../controllers/facultyController')

router.get('/dashboard', (req, res) => {
    res.render('faculty/facultyDashboard.ejs')
})



// -----------------------------------------POST Methods---------------------------
router.post('/markattendance', facultyController.markattendance);
router.post('/savemarkattendance', facultyController.savemarkattendance);


module.exports = router
