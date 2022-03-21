const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.use(express.json());


const soupCtrl = require('../controllers/soup');

router.get('/', soupCtrl.getAllSoups);
router.post('/', auth, soupCtrl.createSoup);
router.get('/:id', soupCtrl.getOneSoup);
router.put('/:id', soupCtrl.modifySoup);
router.delete('/:id', soupCtrl.deleteSoup);

module.exports = router;