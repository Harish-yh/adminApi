const { getAdminById } = require('../module/dboperations');
const express = require('express');
const app = express();

const getadminId = async (request, response) => {
    const id = parseInt(request.params.id);
    
    try {
      const user = await getAdminById(id);
      response.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };


  module.exports = {getadminId
  };