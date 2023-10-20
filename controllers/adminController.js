const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');

const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const supabase = require('../client');
// const asyncHandler = require("express-async-handler");


const login = async function login(req, res) {
    console.log(req.body);
    email = req.body.username
    password = req.body.password
    console.log(email, password);

    try {
        const { data, error } = await supabase
            .from('Users')
            .select()
            .eq('Email', email)

        if (error) {
            console.log(error);
        }
        else {
            dbpass = data.Password
            bcrypt.compare(password, dbpass, function (err, result) {
                if (err) {
                    console.error(err);
                } else if (result) {
                    res.render('admin/adminDashboard.ejs')
                } else {
                    // Passwords do not match, deny access
                    console.log('Password is incorrect');
                }
            });

        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }

    if (error) {
        console.log(error);
        res.send(`<script>alert("Login failed. Please check your credentials."); window.location.href = "/";</script>`);


    }
    else {
        console.log(data.session.access_token);
        res.cookie('supabase_token', data.session.access_token, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
        });
        res.render('adminDashboard.ejs')

    }
}
const logout = async function logout(req, res) {
    res.clearCookie('supabase_token');
    await supabase.auth.signOut();
    res.redirect('/');
}

const teacherDetail = async function teacherDetail(req, res) {
    enrollment = req.body.enrollment
    try {
        const { data, error } = await supabase
            .from('Faculty_Details')
            .select()

        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.render('admin/adminDashboard.ejs')
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}



const singleStudentDetail = async function singleStudentDetail(req, res) {
    enrollment = req.body.enrollment
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()
            .eq('Enrollment_No', enrollment);



        if (error) {
            console.error('Error fetching data:', error);
            res.send("Single Student Details {enrollment}")

        }

        else {
            console.log(data);
            if (data.length === 0) {
                res.send(`<script>alert("${errorMessage}"); window.history.back();</script>`);
            }
            res.render('singleStudentDetail.ejs', { StudentData: data })
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }

}

const forgotPassword = function forgotPassword(req, res) {
    res.sendfile(path.join(__dirname, '../public', 'html', 'forgotPassword.html'))
}

const markAttendance = async function markAttendance(req, res) {
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()

        console.log(data);
        if (error) {
            console.log(error);
        }
        else {
            res.render('markAttendance.ejs', { students: data })
        }
    }
    catch (error) {

    }

}
const allFacultyDetails = async function allFacultyDetails(req, res) {
    try {
        const { data, error } = await supabase
            .from('Faculty_Details')
            .select()

        console.log(data);
        if (error) {
            console.log(error);
        }
        else {
            res.render('allFacultyTable.ejs', { teachers: data })
        }
    }
    catch (error) {

    }
}

const managefaculty = async (req, res) => {
    res.render('admin/faculty/manageFaculty.ejs')
}
const managestudent = async (req, res) => {
    res.render('admin/student/manageStudent.ejs')
}
const managesubject = async (req, res) => {
    res.render('admin/subject/managesubject.ejs')
}

const facultytable = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Faculty_Details')
            .select()
            .order('id', { ascending: true });

        console.log(data);

        if (error) {
            res.redirect('admin/manageFaculty')
        }
        else {
            console.log(data);
            res.render('admin/faculty/facultytable.ejs', { Data: data })
            // res.render('admin/faculty/facultytable.ejs')
        }

    }
    catch
    {

    }
}


const studenttable = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()
            .order('Enrollment_No', { ascending: true });


        console.log(data);

        if (error) {
            res.redirect('admin/managestudent')
        }
        else {
            console.log(data);
            res.render('admin/student/studenttable.ejs', { Data: data })
            // res.render('admin/faculty/facultytable.ejs')
        }

    }
    catch
    {

    }
}
const searchfaculty = async (req, res) => {
    console.log(req.body.id);
    try {
        const { data, error } = await supabase
            .from('Faculty_Details')
            .select()
            .eq('id', req.body.id)
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.render('admin/faculty/searchfaculty.ejs', { data: data })
        }

    }
    catch {

    }
}
const searchstudent = async (req, res) => {
    console.log(req.body.enroll);
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()
            .eq('Enrollment_No', req.body.enroll)
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.render('admin/student/searchstudent.ejs', { Data: data })
        }

    }
    catch {

    }
}
const editfacultydetails = async (req, res) => {
    const jsonDataString = req.body.jsonData;
    const incomingId = JSON.parse(jsonDataString);

    try {
        const { data, error } = await supabase
            .from('Faculty_Details')
            .select()
            .eq('id', incomingId.id)

        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.render('admin/faculty/editfacultydetails.ejs', { Data: data })
        }

    } catch (error) {

    }
}
const editstudent = async (req, res) => {

    const jsonDataString = req.body.jsonData;
    const enroll = JSON.parse(jsonDataString);
    console.log(enroll);
    try {
        const { data, error } = await supabase
            .from('Student_Details')
            .select()
            .eq('Enrollment_No', enroll.id)

        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            res.render('admin/student/editstudentdetails.ejs', { Data: data });
        }

    } catch (error) {

    }
}


const savestudent = async (req, res) => {
    console.log(req.body);
    try {

        const { error } = await supabase
            .from('Student_Details')
            .update({
                Enrollment_No: req.body.enrollment, Name: req.body.name, Email: req.body.email, Mobile_no: req.body.mobile, Gender: req.body.gender, DOB: req.body.dob, Guardians_Mobile: req.body.guardianmobile, Guardians_Name: req.body.guardianName, CGPA: req.body.cgpa, Course: req.body.course, Programme: req.body.programme
            })
            .eq('Enrollment_No', req.body.enrollment)

        if (error) {
            console.log(error);
        }
        else {
            res.send(`<script>alert("Student Details Saved"); window.location.href = "/admin/managestudent";</script>`);


        }
    } catch (error) {

    }
}


const savefaculty = async (req, res) => {
    console.log(req.body);
    try {

        const { error } = await supabase
            .from('Faculty_Details')
            .update({ Name: req.body.name, email: req.body.email, Mobile: req.body.mobile, Gender: req.body.gender, Designation: req.body.designation, Qualifications: req.body.qualification, DOB: req.body.DOB })
            .eq('id', req.body.id)

        if (error) {
            console.log(error);
        }
        else {
            res.send(`<script>alert("Faculty Details Saved"); window.location.href = "/admin/manageFaculty";</script>`);


        }
    } catch (error) {

    }
}



// ---------------------------Adding Student, Subject, Faculty----------------------------------------->
const addfaculty = async (req, res) => {
    console.log(req.body);

    try {
        const { error: errorFacultyDetails } = await supabase
            .from('Faculty_Details')
            .insert({
                email: req.body.email,
                Name: req.body.name,
                Mobile: req.body.mobile,
                Gender: req.body.gender,
                Designation: req.body.Designation,
                Branch: 'CSE',
                Qualifications: req.body.Qualification,
                DOB: req.body.dob
            });

        const { error: errorUsers } = await supabase
            .from('Users')
            .insert({
                Email: req.body.email,
                Name: req.body.name,
                User: 2,
                Password: "$2b$10$.Q87HwZ1CePFk.iFFFvvZ.5sCpeNI8VLhobeLd5MmCwFj0GAq6hWe"
            });

        if (errorFacultyDetails || errorUsers) {
            console.log("Error adding faculty:", errorFacultyDetails || errorUsers);
        } else {
            res.send(`<script>alert("Faculty Added Successfully"); window.location.href = "/admin/dashboard";</script>`);
        }
    } catch (error) {
        console.error("Error in addfaculty function:", error);
        res.status(500).send("Internal Server Error");
    }
};

const addstudent = async (req, res) => {
    console.log(req.body);
    email = req.body.name
    password = req.body.password

    try {

        const { error: errorStudentDetails } = await supabase
            .from('Student_Details')
            .insert({
                Enrollment_No: req.body.enrollment, Name: req.body.name, Email: req.body.email, Mobile_no: req.body.mobile, Gender: req.body.gender, DOB: req.body.dob, Guardians_Mobile: req.body.guardianmobile, Guardians_Name: req.body.guardianName, CGPA: req.body.cgpa, Course: req.body.course, Programme: req.body.programme
            })

        const { error: errorUsers } = await supabase
            .from('Users')
            .insert({
                Email: req.body.email,
                Name: req.body.name,
                User: 3,
                Password: "$2b$10$.Q87HwZ1CePFk.iFFFvvZ.5sCpeNI8VLhobeLd5MmCwFj0GAq6hWe"
            });

        if (errorStudentDetails || errorUsers) {
            console.log("Error adding faculty:", errorStudentDetails || errorUsers);
            if (errorStudentDetails.code === '23505') {
                res.send(`<script>alert("Student Adding Failed. Already have same enrollment number"); window.location.href = "/admin/dashboard";</script>`);
            }
        }

        else {
            res.send(`<script>alert("Student Added Successfully"); window.location.href = "/admin/dashboard";</script>`);
        }
    }
    catch {

    }
}











module.exports = {

    savestudent, addstudent, editstudent, searchstudent, savefaculty, addfaculty, studenttable, managesubject, managestudent, editfacultydetails, searchfaculty, facultytable, managefaculty, singleStudentDetail, forgotPassword, login, logout, markAttendance, teacherDetail, allFacultyDetails
}
