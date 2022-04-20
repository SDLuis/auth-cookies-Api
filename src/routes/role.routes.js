const { Router } = require('express');
const { showRole, addRole, editRole , deleteRole} = require('../controllers/role.controllers');

const router = Router();

router.get('/role', showRole);
router.post('/addRole', addRole);
router.put('/editRole/:id', editRole);
router.delete('/deleteRole/:id', deleteRole);

module.exports = router;