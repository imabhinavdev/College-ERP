const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');

const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const supabase = require('../client');

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