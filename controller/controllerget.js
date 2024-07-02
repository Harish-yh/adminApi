const { getadminDB } = require('../module/dboperations');
const express = require('express');
const app = express();

const getdata = async (req,res)=>{
 try {
    const admins = await getadminDB();
    res.status(200).json(admins);
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
 }
}


module.exports = {getdata
};
