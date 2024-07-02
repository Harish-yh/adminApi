// const { createUser } = require('../module/dboperations');
const express = require('express');
const app = express();
// const fs = require('fs');
const pool = require('../module/db');
//const upload = require('../middleware/uploads');

const createUserind = async (req, res) => {
    const {firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype,status_id} = req.body;
    console.log(req.body); // Check the structure and content of req.body

    const profilePicUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        if (req.file) {
            if (req.file.size > 2 * 1024 * 1024) {
                return res.status(400).send('File size exceeded (Max: 2MB)');
            }
        
            if (!['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'image/gif'].includes(req.file.mimetype)) {
                return res.status(400).send('Only .jpeg, .jpg, .png, .mp4, and .gif files are allowed');
            }
        }
        const result = await pool.query(
            'INSERT INTO admin_tbl (firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype, profile_img,status_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
            [firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype, profilePicUrl,status_id]
        );
        res.status(201).json({ message: "epudra done" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//created successfully





module.exports = {
    createUserind
};


