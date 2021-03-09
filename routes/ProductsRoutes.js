const express = require('express');
const router = express.Router();

//Recovery of the Products controller
const ProductsController = require('../controllers/ProductsController');

router.get('/', ProductsController.getAllProducts); // Route to Get All Products
router.get('/:id', ProductsController.getOneProducts); // Route to Get Find One Products
router.post('/', ProductsController.createProducts); // Route to Create Products
router.put('/:id', ProductsController.updateProducts); // Route to Update Products
router.put('/enable/:id', ProductsController.enableProducts); // Route to Enable Products
router.put('/disable/:id', ProductsController.disableProducts); // Route to Disable Products

module.exports = router; //exports All Routes Products