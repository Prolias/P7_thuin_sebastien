const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUser);
router.get('/profile', auth, userCtrl.getMyProfile);
router.get('/:id', userCtrl.getOneUser);
router.put('/', auth, userCtrl.modifyUser);
router.delete('/', auth, userCtrl.deleteOneUser);

module.exports = router;