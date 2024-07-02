//const { pool } = require('../module/dboperations');

const pool = require('../module/db');

const express = require('express');
const app = express();


const search = async (req, res) => {
    try {
        const { search } = req.body;

        console.log(search);
        
        let query = `
            SELECT *
            FROM admin_tbl
        `;
        let queryParams = [];

        if (search) {
            const SearchValue = `%${search.toLowerCase()}%`;
            query += `
                WHERE LOWER(firstname) LIKE $1
                OR LOWER(lastname) LIKE $1
                OR LOWER(emailid) LIKE $1
                OR LOWER(status) LIKE $1
                OR mobilenumber::text LIKE $1
                OR LOWER(password) LIKE $1
                OR LOWER(roletype) LIKE $1
                OR status_id:: text LIKE $1
                OR TO_CHAR(created_date, 'mon DD') LIKE $1 
                OR TO_CHAR(updated_date, 'mon DD') LIKE $1
            `;
            queryParams = [SearchValue];
        }

        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Error searching promotions' });
    }
};



 module.exports = {search
 };
 