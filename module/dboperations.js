
const pool = require('./db');


const getadminDB = async () => {
    try {
      const results = await pool.query('SELECT * FROM public.admin_tbl');
      return results.rows;
    } catch (error) {
      throw error;
    }
  }

  

  const getAdminById = async (id) => {
    try {
      const results = await pool.query('SELECT * FROM public.admin_tbl WHERE adminid = $1', [id]);
      return results.rows;
    } catch (error) {
      console.error('Database query error', error);
      throw error;
    }
  };

  const deleteAdminById = async (id) => {
    try {
      const query = 'DELETE FROM public.admin_tbl WHERE adminid = $1 RETURNING *';
      const values = [id];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };



module.exports = {
    getadminDB,getAdminById,deleteAdminById
  };


