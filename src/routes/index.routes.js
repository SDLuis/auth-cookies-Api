const { Router } = require('express');
const { resIndex, resProtected} = require('../controllers/index.controllers')
const { auth } = require('../controllers/auth.controllers')

const router = Router();

router.get('/', resIndex);
router.get('/protected', auth, resProtected)

module.exports = router;