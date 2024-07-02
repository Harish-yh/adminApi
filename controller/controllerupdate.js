const express = require('express');
const app = express();
// const fs = require('fs');
const pool = require('../module/db');


// const adminupdate = async (req, res) => {
//     const { firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype,status_id,created_date,updated_date } = req.body;
//     const { id } = req.params;

//     const profile_img = req.file ? `/images/${req.file.filename}` : null;

//     try {
//         if (req.file) {
//             if (req.file.size > 2 * 1024 * 1024) {
//                 return res.status(400).send('File size exceeded (Max: 2MB)');
//             }
        
//             if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype)) {
//                 return res.status(400).send('Only .jpeg, .jpg, .png, and .gif files are allowed');
//             }
//         }

//         let query = 'UPDATE admin_tbl SET firstname = $1, lastname = $2, emailid = $3, status = $4, mobilenumber = $5, password = $6, confirmpassword = $7, roletype = $8, status_id = $9,created_date = $10,updated_date = $11';
//         const values = [firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype, status_id,created_date,updated_date];

//         if (profile_img) {
//             query += ', profile_img = $12';
//             values.push(profile_img);
//         }

//         query += ' WHERE adminid = $13 RETURNING *';
//         values.push(id);

//         const result = await pool.query(query, values);

//         if (result.rows.length === 0) {
//             return res.status(404).send('Admin not found');
//         }

//         res.status(200).json({ message: 'epudra done' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

/////////////////// below code /////////--------- updated_date ---------- auto update

const adminupdate = async (req, res) => {
    const { firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype, status_id } = req.body;
    const { id } = req.params;

    const profile_img = req.file ? `/images/${req.file.filename}` : null;

    try {
        if (req.file) {
            if (req.file.size > 2 * 1024 * 1024) {
                return res.status(400).send('File size exceeded (Max: 2MB)');
            }
        
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype)) {
                return res.status(400).send('Only .jpeg, .jpg, .png, and .gif files are allowed');
            }
        }

        let query = 'UPDATE admin_tbl SET firstname = $1, lastname = $2, emailid = $3, status = $4, mobilenumber = $5, password = $6, confirmpassword = $7, roletype = $8, status_id = $9, updated_date = NOW()';
        const values = [firstname, lastname, emailid, status, mobilenumber, password, confirmpassword, roletype, status_id];

        if (profile_img) {
            query += ', profile_img = $10';
            values.push(profile_img);
        }

        query += ' WHERE adminid = $11 RETURNING *';
        values.push(id);

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send('Admin not found');
        }

        res.status(200).json({ message: 'epudra successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

///Update successful

module.exports = {
    adminupdate
};
