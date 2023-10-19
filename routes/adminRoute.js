const express = require('express');
const supabase = require('../client');
const path = require('path')

const router = express.Router()
const adminController = require('../controllers/adminController')

// All Get Method
router.get('/dashboard', (req, res) => {
    res.render('admin/adminDashboard.ejs')
})
router.get('/manageFaculty', adminController.managefaculty)
router.get('/managestudent', adminController.managestudent)
router.get('/managesubject', adminController.managesubject)
router.get('/facultytable', adminController.facultytable)
router.get('/studenttable', adminController.studenttable)

router.get('/markAttendance', adminController.markAttendance)
router.get('/allFacultyDetails', adminController.allFacultyDetails)


// All Post Method
router.post('/facultytable', adminController.facultytable)
router.post('/searchfaculty', adminController.searchfaculty)
router.post('/editfacultydetails', adminController.editfacultydetails)
router.post('/singleStudentDetail', adminController.singleStudentDetail)
router.post('/addfaculty', adminController.addfaculty)
router.post('/savefaculty', adminController.savefaculty)
router.post('/searchstudent', adminController.searchstudent)
router.post('/editstudent', adminController.editstudent)
router.post('/addstudent', adminController.addstudent)
router.post('/savestudent', adminController.savestudent)


// Already logged in check
router.get('/login', async (req, res, next) => {
    const token = req.erpLoggedin;
    console.log("new token", token);
    if (!token) {
        return res.render('login.ejs', { errorMessage: null });
    }

    res.redirect('/admin/dashboard');

});
router.get('/singleStudent', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'singleStudent.html'))
})

module.exports = router;