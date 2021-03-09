const express = require('express');
const router = express.Router();

//Recovery of the branch controller
const GuaranteeFormulasController = require('../controllers/GuaranteeFormulasController');

router.get('/', GuaranteeFormulasController.getAllGuaranteeFormulas) // Route to Get All Gurantee & Formulas
router.get('/:id', GuaranteeFormulasController.getOneGuaranteeFormulas) // Route to Get One Gurantee & Formulas
router.post('/', GuaranteeFormulasController.attach) // Route to Attach Gurantee & Formulas

module.exports = router;  //exports All Routes Gurantee & Formulas