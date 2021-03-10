const { Guarantee } = require('../models'); // Models Segments Import 
const { Formulas } = require('../models'); // Models Segments Import 
const { Guarantee_Formulas } = require('../models'); // Models Segments Import 

const slug = require('slug');

// Get Relation table text
const relations = require('../relations/TableRelations');
relations.GuaranteeFormulasAssociation(); // Association Guarantee and Formulas

//Get All Guarantee save in database
exports.getAllGuarantee = (req, res, next) => {
    Guarantee.findAll({ include: [Formulas] })
        .then(data => res.status(200).json({ 'error': false, 'Guarantee': data}))

        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving Guarantee."
            });
        });
}
// Controller to Find and Show one Guarantee 
exports.getOneGuarantee = (req, res, next) => {
    const id = req.params.id;

    Guarantee.findByPk(id, { include: [Formulas] })
        .then(data => res.status(200).json({ 'error': false, 'Guarantee': data, 'message':' Guarantee was selected' }))
        .catch(err => {
            res.status(500).json({
                message: err.message || "Error retrieving Guarantee with id=" + id
            });
        });
}

// Controller to Create Guarantee
exports.createGuarantee = (req, res, next) => {
    if (!req.body.guarantee_name) { 
        res.status(400).json({
            message: "Guarantee name Content can not be empty!"
        });
        return;
    }
    if (!req.body.code_guarantee) { 
        res.status(400).json({
            message: "Guarantee code Content can not be empty!"
        });
        return;
    }
    if (!req.body.ref_calcule) { 
        res.status(400).json({
            message: "Ref Calcule Content can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).json({
            message: "Description Content can not be empty!"
        });
        return;
    }

    const guarantee = new Guarantee({
        guarantee_name: req.body.guarantee_name,
        code_guarantee: req.body.code_guarantee,
        ref_calcule: req.body.ref_calcule,
        description: req.body.description,
        slug: slug(req.body.guarantee_name),
        status: 1,
        created_at : Date.now(),
        updated_at : Date.now()
    });
    guarantee.save().then(
        () => {
            res.status(201).json({'error': false, 'message': 'Guarantee ' + guarantee.guarantee_name + ' was created'});
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Controller to Update Guarantee
exports.updateGuarantee = (req, res, next) => {
    let { guarantee_name, description} = req.body;
    const guarantee_id = req.params.id;
    Guarantee.update({ guarantee_name: guarantee_name, slug: slug(req.body.guarantee_name), description:description}, 
    { where: { id: guarantee_id} })
        .then(data => res.status(200).json({ 'error': false, 'message': 'The Guarantee was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}

// Controller to Enable Guarantee 
exports.enableGuarantee = (req, res, next) => {
    let status = 1;
    const guarantee_id = req.params.id;
    Guarantee.update({ status: status }, 
    { where: { id: guarantee_id} })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Guarantee id = '+ guarantee_id + ' was enabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}

// Controller to Disable Guarantee
exports.disableGuarantee = (req, res, next) => {
    let disabledAt = Date.now();
    let status = 0;
    const guarantee_id = req.params.id;
    Guarantee.update({ status: status, disabledAt:disabledAt }, 
    { where: { id: guarantee_id } })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Guarantee id = '+ guarantee_id + ' was disable' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}