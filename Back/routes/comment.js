const express = require('express');
const router = express.Router({mergeParams: true});

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth.js');

router.get('/', commentCtrl.getAllComments)
router.post('/', auth, commentCtrl.createNewComment)
router.get('/:idCom', commentCtrl.getAllCommentsFromComment)
router.put('/:idCom', auth, commentCtrl.modifyOneComment)
router.delete('/:idCom', auth, commentCtrl.deleteOneComment)

module.exports = router;