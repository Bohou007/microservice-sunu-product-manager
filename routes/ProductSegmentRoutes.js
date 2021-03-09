const express = require('express');
const router = express.Router();

//Recovery of the branch controller
const ProductSegmentController = require('../controllers/ProductSegmentController');

router.get('/', ProductSegmentController.getAllProductSegment) // Route to Get All Product & Segment
router.get('/:id', ProductSegmentController.getOneProductSegment) // Route to Get One Product & Segment
router.post('/', ProductSegmentController.attach) // Route to Attach Product & Segment

module.exports = router;  //exports All Routes Product & Segment