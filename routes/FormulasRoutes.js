const express = require('express');
const router = express.Router();

//Recovery of the Formulas controller
const FormulasController = require('../controllers/FormulasController');

router.get('/', FormulasController.getAllFormulas); // Route to Get All Formulas
router.get('/:id', FormulasController.getOneFormulas); // Route to Get Find One Formulas
router.post('/', FormulasController.createFormulas); // Route to Create Formulas
router.put('/:id', FormulasController.updateFormulas); // Route to Update Formulas
router.put('/enable/:id', FormulasController.enableFormulas); // Route to Enable Formulas
router.put('/disable/:id', FormulasController.disableFormulas); // Route to Disable Formulas

module.exports = router; //exports All Routes Formulas