const express = require('express');
const router = express.Router();

//Recovery of the Segments controller
const GuaranteeController = require('../controllers/GuaranteeController');

router.get('/', GuaranteeController.getAllGuarantee); // Route to Get All Segments
router.get('/:id', GuaranteeController.getOneGuarantee); // Route to Get Find One Segments
router.post('/', GuaranteeController.createGuarantee); // Route to Create Segments
router.put('/:id', GuaranteeController.updateGuarantee); // Route to Update Segments
router.put('/enable/:id', GuaranteeController.enableGuarantee); // Route to Enable Segments
router.put('/disable/:id', GuaranteeController.disableGuarantee); // Route to Disable Segments

module.exports = router; //exports All Routes Segments