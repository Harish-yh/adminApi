const express = require('express');
const app = express();
// const fs = require('fs');
const pool = require('../module/db');


const adminupdateid = async (req, res) => {
    const { id } = req.params;
    const { firstname } = req.body;
    const fieldsToUpdate = {};

    // Validate firstname
    if (firstname) {
        fieldsToUpdate.firstname = firstname;
    }

    if (req.file) {
        if (req.file.size > 2 * 1024 * 1024) {
            return res.status(400).send('File size exceeded (Max: 2MB)');
        }

        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(req.file.mimetype)) {
            return res.status(400).send('Only .jpeg, .jpg, .png, and .gif files are allowed');
        }

        fieldsToUpdate.profile_img = `/images/${req.file.filename}`;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).send('No fields to update');
    }

    try {
        const { query, values } = buildUpdateQuery(fieldsToUpdate, id);
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send('Admin not found');
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const buildUpdateQuery = (fields, id) => {
    let query = 'UPDATE admin_tbl SET ';
    const set = [];
    const values = [];

    Object.keys(fields).forEach((field, index) => {
        set.push(`${field} = $${index + 1}`);
        values.push(fields[field]);
    });

    query += set.join(', ') + ` WHERE adminid = $${set.length + 1} RETURNING *`;
    values.push(id);

    return { query, values };
};

//////////***** particular id update */--------------------------------
// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload');
// const { pool } = require('../config');

// // PUT /admin/:id - Update firstname
// const adminupdateid = async (req, res) => {
//     const { id } = req.params;
//     const { firstname } = req.body;

//     if (!firstname) {
//         return res.status(400).send('No fields to update');
//     }

//     try {
//         const query = 'UPDATE admin_tbl SET firstname = $1 WHERE adminid = $2 RETURNING *';
//         const values = [firstname, id];
//         const result = await pool.query(query, values);

//         if (result.rows.length === 0) {
//             return res.status(404).send('Admin not found');
//         }

//         res.status(200).json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Register the route handler
// router.put('/:id', adminupdateid);

// module.exports = router;



module.exports = {
    adminupdateid,buildUpdateQuery
};
