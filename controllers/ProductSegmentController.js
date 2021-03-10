const { Product } = require('../models');
const { Segment } = require('../models');
const { Product_Segment } = require('../models');

// Get Relation table text
const relations = require('../relations/TableRelations');
relations.ProductSegmentAssociation(); // Association Product and Segment

exports.getAllProductSegment = (req, res, next) => {
    
    Product_Segment.findAll({ include: [Product, Segment] })
        .then(data => res.status(200).json({ 'error': false, 'Product-Segment': data}))

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Branch Filiale."
            });
        });
}


exports.getOneProductSegment = (req, res, next) => {

    const id = req.params.id;

    Product_Segment.findByPk(id, { include: [Product, Segment] })
        .then(data => res.status(200).json({ 'error': false, 'Product & Segment': data, 'message': data.filiale_name + ' Product & Segment was selected' }))
        .catch(err => {
            res.status(500).json({
                message: err.message || "Error retrieving Product & Segment with id=" + id
            });
        });
}


exports.attach = (req, res, next) => {
    let { product_id, segment_id } = req.body;

    let product = Product.findAll({ where: { id: product_id } });
    let segment = Segment.findOne({ where: { id: segment_id } });

    if (product && segment) {
        Product_Segment.create({ product_id: product_id, segment_id: segment_id })
            .then(
                () => {
                    res.status(201).json({ 'error': false, 'message': 'The Products was attached to Segment' });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
    } else {
        res.status(404).send("Data is not existe");
    }




}