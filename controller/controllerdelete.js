const { deleteAdminById } = require('../module/dboperations');
const express = require('express');
const app = express();

const deletetbl = async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      const deletedUser = await deleteAdminById(id);
      res.json({ message: 'admin deleted successfully', deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {deletetbl
  };
  