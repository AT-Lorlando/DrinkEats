const express = require('express');
const router = express.Router();
router.use(express.json());


const soupCtrl = require('../controllers/soup');

router.get('/', soupCtrl.getAllSoups);
router.post('/', soupCtrl.createSoup);
router.get('/:id', soupCtrl.getOneSoup);
router.put('/:id', soupCtrl.modifySoup);
router.delete('/:id', soupCtrl.deleteSoup);

module.exports = router;