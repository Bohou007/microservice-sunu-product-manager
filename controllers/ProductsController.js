const { Product } = require('../models'); // To Get the model for Products
const { Segment } = require('../models'); // To Get the model for Products
const { Formulas } = require('../models'); // To Get the model for Formulas
const { Product_Segment } = require('../models'); // To Get the model for Products

const slug = require('slug');

// Get Relation table text
const relations = require('../relations/TableRelations');
relations.ProductFormulasAssociation(); // Association Product and Formulas
relations.ProductSegmentAssociation(); // Association Product and Segment

//Get All Products save in database
exports.getAllProducts = (req, res, next) => {

    Product.findAll({ include: [Segment, Formulas] })
        .then(data => res.status(200).json({ 'error': false, 'Products': data}))

        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving Products."
            });
        });
     
}


// Controller to Find and Show one Products
exports.getOneProducts = (req, res, next) => {
    
    const id = req.params.id;
    if(!id)
    {
        res.status(404).json("The Id isnt exist !");
    }
    Product.findByPk(id, { include: [Segment, Formulas] })
        .then(data => res.status(200).json({ 'error': false, 'Products': data, 'message': 'One Products was selected' }))
        .catch(err => {
            res.status(500).json({
                message: err.message || "Error retrieving Products with id=" + id
            });
        });
}


// Controller to Create Products
exports.createProducts = (req, res , next) => {
    if (!req.body.code_product) { 
        res.status(400).json({
            message: "Products ISO Code Content can not be empty!"
        });
        return;
    }
    if (!req.body.product_name) {
        res.status(400).json({
            message: "Products Name Content can not be empty!"
        });
        return;
    }
    if (!req.body.code_filiale) {
        res.status(400).json({
            message: "Products Name Content can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).json({
            message: "Description Content can not be empty!"
        });
        return;
    }

    const product = new Product({
        code_product: req.body.code_product,
        product_name: req.body.product_name,
        code_filiale: req.body.code_filiale,
        age_min: req.body.age_min,
        age_max: req.body.age_max,
        description: req.body.description,
        slug: slug(req.body.product_name),
        status: 1,
        created_at : Date.now(),
        updated_at : Date.now()
    });
    product.save().then(
        () => {
            res.status(201).json({'error': false, 'message': 'Products ' + product.product_name + ' was created'});
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Controller to Update Products
exports.updateProducts = (req, res , next) => {
    let { code_product, product_name,age_min,age_max, description} = req.body;
    const product_id = req.params.id;
    Product.update({ 
        code_product: code_product, 
        product_name: product_name,
        age_min: age_min,
        age_max: age_max,
        description:description, 
        slug: slug(req.body.product_name)
    }, 
    { where: { id: product_id} })
        .then(data => res.status(200).json({ 'error': false,'message': 'The Products id = '+ product_id + ' was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}


// Controller to Enable Products
exports.enableProducts = (req, res, next) => {
    let status = 1;
    const product_id = req.params.id;
    Product.update({ status: status }, 
    { where: { id: product_id } })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Products id = '+ product_id + ' was enabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}


// Controller to Disable Products
exports.disableProducts = (req, res, next) => {
    let status = 0;
    let disabledAt = Date.now();
    const product_id = req.params.id;
    Product.update({ status: status, disabledAt:disabledAt}, 
    { where: { id: product_id } })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Products id = '+ product_id + ' was disabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}