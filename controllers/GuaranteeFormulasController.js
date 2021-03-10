const { Guarantee } = require('../models');
const { Formulas } = require('../models');
const { Guarantee_Formulas } = require('../models');

// Get Relation table text
const relations = require('../relations/TableRelations');
relations.GuaranteeFormulasAssociation(); // Association Guarantee and Formulas


exports.getAllGuaranteeFormulas = (req, res, next) => {
    
    Guarantee_Formulas.findAll({ include: [Guarantee, Formulas] })
        .then(data => res.status(200).json({ 'error': false, 'Guarantee-Segment': data}))

        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving Guarantee Formulas."
            });
        });
}


exports.getOneGuaranteeFormulas = (req, res, next) => {
    const id = req.params.id;

    Guarantee_Formulas.findByPk(id, { include: [Guarantee, Formulas] })
        .then(data => res.status(200).json({ 'error': false, 'Guarantee & Formulas': data, 'message': ' Guarantee & Formulas was selected' }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Guarantee & Formulas with id=" + id
            });
        });
}


exports.attach = (req, res, next) => {
    let { guarantee_id, formulas_id } = req.body;

    let guarantee = Guarantee.findOne({ where: { id: guarantee_id } });
    let formulas = Formulas.findOne({ where: { id: formulas_id } });

    if (guarantee && formulas) {
        Guarantee_Formulas.create({ guarantee_id: guarantee_id, formulas_id: formulas_id })
            .then(
                () => {
                    res.status(201).json({ 'error': false, 'message': 'The guarantee was attached to formulas' });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
    } else {
        res.status(404).json({ message:"Data is not existe"});
    }




}