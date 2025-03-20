const { validationResult } = require('express-validator');
const { Leave } = require('../models');

// @route   Register api/compalint
// @desc    Register complaint
// @access  Public
exports.registerLeave = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, hostel, purpose, leaving_date,return_date } = req.body;
    try {
        const newComplaint = new Leave({
            student,
            hostel,
            purpose,
            leaving_date,
            return_date
        });
        await newComplaint.save();
        success = true;
        res.json({ success, msg: 'Leave registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get all complaints by hostel id
// @access  Public
exports.getbyhostel = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    try {
        const complaints = await Complaint.find({ hostel }).populate('student', ['name', 'room_no']);
        success = true;
        res.json({ success, complaints });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get all complaints by student id
// @access  Public
exports.getbystudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    try {
        const leaves = await Leave.find({ student });
        success = true;
        res.json({ success, leaves });
    }
    catch (err) {
        console.error(err.errors);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get complaint by complaint id
// @access  Public
exports.resolve = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { id } = req.body;
    try {
        const leave = await Leave.findById(id);
        leave.status = "solved";
        await leave.save();
        success = true;
        res.json({ success });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}