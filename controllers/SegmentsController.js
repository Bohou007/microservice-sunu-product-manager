const { Segment } = require('../models'); // Models Segments Import 
const { Product } = require('../models'); // Models Segments Import 
const { Product_Segment } = require('../models'); // Models Segments Import 

const slug = require('slug');


// Get Relation table text
const relations = require('../relations/TableRelations');
relations.ProductSegmentAssociation(); // Association Product and Segment

//Get All Segments save in database
exports.getAllSegments = (req, res, next) => {
  
    Segment.findAll({ include: [Product] })
        .then(data => res.status(200).json({ 'error': false, 'Segments': data}))

        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving Segments."
            });
        });
}
// Controller to Find and Show one Segments 
exports.getOneSegments = (req, res, next) => {
    
    const id = req.params.id;

    Segment.findByPk(id, { include: [Product] })
        .then(data => res.status(200).json({ 'error': false, 'Segments': data, 'message': data.segment_name + ' Segments was selected' }))
        .catch(err => {
            res.status(500).json({
                message: err.message || "Error retrieving Segments with id=" + id
            });
        });
}

// Controller to Create Segments
exports.createSegments = (req, res, next) => {
    if (!req.body.segment_name) { 
        res.status(400).json({
            message: "Segments name Content can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).json({
            message: "Description Content can not be empty!"
        });
        return;
    }

    const segment = new Segment({
        segment_name: req.body.segment_name,
        description: req.body.description,
        slug: slug(req.body.segment_name),
        status: 1,
        created_at : Date.now(),
        updated_at : Date.now()
    });
    segment.save().then(
        () => {
            res.status(201).json({'error': false, 'message': 'Segments ' + segment.segment_name + ' was created'});
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

// Controller to Update segment
exports.updateSegments = (req, res, next) => {
    let { segment_name, description} = req.body;
    const segment_id = req.params.id;
    Segment.update({ segment_name: segment_name, slug: slug(req.body.segment_name), description:description}, 
    { where: { id: segment_id} })
        .then(data => res.status(200).json({ 'error': false, 'message': 'The Segments was update with success' }))
        .catch(error => res.status(400).json({ 'error': true, 'message': error }));
}

// Controller to Enable Segments 
exports.enableSegments = (req, res, next) => {
    let status = 1;
    const segment_id = req.params.id;
    Segment.update({ status: status }, 
    { where: { id: segment_id} })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Segments id = '+ segment_id + ' was enabled' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}

// Controller to Disable Segments
exports.disableSegments = (req, res, next) => {
    let disabledAt = Date.now();
    let status = 0;
    const segment_id = req.params.id;
    Segment.update({ status: status, disabledAt:disabledAt }, 
    { where: { id: segment_id } })
        .then(data => res.status(200).json(
            { 
                'error': false,
                'message': 'The Segments id = '+ segment_id + ' was disable' 
            }))
        .catch(error => res.status(400).json({ 
            'error': true, 'message': error 
        }));
}