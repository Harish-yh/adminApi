const express = require('express');
const router = express.Router();
const controller = require('../controller/controllerget');
const controllerinsert = require('../controller/controllerinsert');
const pool = require('../module/db');
const upload = require('../middleware/uploads');
const controllerupdate = require('../controller/controllerupdate');
const controllerid = require('../controller/controllerid');
const controllerdelete = require('../controller/controllerdelete');
const controllerupdateid = require('../controller/controllerupdateid');
const controllersearch = require('../controller/controllersearch');

// POST /users - Create a new user
router.post('/admin', upload.single('profile_img'),controllerinsert.createUserind)



router.put('/admin/:id', upload.single('profile_img'),controllerupdate.adminupdate)

router.put('/admin/id/:id', upload.single('profile_img'),controllerupdateid.adminupdateid)

router.get('/admin', controller.getdata);

router.get('/admin/:id', controllerid.getadminId);

router.delete('/admin/:id',controllerdelete.deletetbl);

router.post('/search',controllersearch.search);


module.exports = router;


