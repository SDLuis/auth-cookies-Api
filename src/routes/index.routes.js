const { Router } = require('express');
const { resIndex } = require('../controllers/index.controllers')

const router = Router();

router.get('/', resIndex);

module.exports = router;