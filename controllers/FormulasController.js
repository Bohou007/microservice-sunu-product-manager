const { Formulas } = require('../models'); // To Get the model for Formulas
const { Product } = require('../models'); // To Get the model for Products
const { Guarantee_Formulas } = require('../models'); // To Get the model for Products
const { Guarantee } = require('../models'); // To Get the model for Products

const slug = require('slug'); // Module du genere a slug

// Get Relation table text
const relations = require('../relations/TableRelations');
relations.ProductFormulasAssociation(); // Association Product and Formulas
relations.GuaranteeFormulasAssociation(); // Association Guarantee and Formulas

// Controller to Get All Formulas
exports.getAllFormulas = (req, res, next) => {
    
    Formulas.findAll({ include: [Product, Guarantee] })
        .then(data => res.status(200).json({ 'error': false, 'Formulas': data }))

        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving Formulas."
            });
        });
}
// Controller to Find one Formulas
exports.getOneFormulas = (req, res, next) => {

    const id = req.params.id;

    Formulas.findByPk(id, { include: [Product, Guarantee] })
        .then(data => res.status(200).json({ 'error': false, 'Formulas': data, 'message': data.formulas_name + ' Formulas was selected' }))
        .catch(err => {
            res.status(500).json({
                message: err.message || "Error retrieving Formulas with id=" + id
            });
        });
}

// Controller to Create Formulas
exports.createFormulas = (req, res, next) => {

    if (!req.body.formulas_name) {
        res.status(400).json({
            message: "Formulas Name Content can not be empty!"
        });
        return;
    }
    if (!req.body.code_formulas) {
        res.status(400).json({
            message: "Formulas Code Content can not be empty!"
        });
        return;
    }
    const product = Product.findByPk(req.body.productId);
    if (product == "") {
        res.status(400).json({
            message: "Products is not exist!"
        });
        return;
    }
    if (!req.body.productId) {
        res.status(400).json({
            message: "product Id Content can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).json({
            message: "Description Id Content can not be empty!"
        });
        return;
    }

    const formulas = new Formulas({
        formulas_name: req.body.formulas_name,
        code_formulas: req.body.code_formulas,
        productId: req.body.productId,
        description: req.body.description,
        slug: slug(req.body.formulas_name),
        status: 1,
        created_at: Date.now(),
        updated_at: Date.now()
    });
    formulas.save().then(
        () => {
            res.status(201).json({ 'error': false, 'message': 'The Formulas was created' });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}
// Controller to Update Formulas
exports.updateFormulas = (req, res, next) => {

    let { formulas_name, description } = req.body;
    const formulas_id = req.params.id;
    Formulas.update({
        formulas_name: formulas_name,
        description: description,
        slug: slug(formulas_name)
    },
        { where: { id: formulas_id } })
        .then(data => res.status(200).json({ 'error': false, 'message': 'The Formulas id = ' + formulas_id + ' was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}

// Controller to Enable Formulas
exports.enableFormulas = (req, res, next) => {
    let status = 1;
    const formulas_id = req.params.id;
    Formulas.update({ status: status },
        { where: { id: formulas_id } })
        .then(data => res.status(200).json(
            {
                'error': false,
                'message': 'The Formulas id = ' + formulas_id + ' was enabled'
            }))
        .catch(error => res.status(400).json({
            'error': true, 'message': error
        }));
}
// Controller to Disable Formulas
exports.disableFormulas = (req, res, next) => {
    let status = 0;
    let disabledAt = Date.now();
    const formulas_id = req.params.id;
    Formulas.update({ status: status, disabledAt: disabledAt },
        { where: { id: formulas_id } })
        .then(data => res.status(200).json(
            {
                'error': false,
                'message': 'The Formulas id = ' + formulas_id + ' was disabled'
            }))
        .catch(error => res.status(400).json({
            'error': true, 'message': error
        }));
}
