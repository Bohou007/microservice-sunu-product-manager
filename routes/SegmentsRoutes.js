const express = require('express');
const router = express.Router();

//Recovery of the Segments controller
const SegmentsController = require('../controllers/SegmentsController');

router.get('/', SegmentsController.getAllSegments); // Route to Get All Segments
router.get('/:id', SegmentsController.getOneSegments); // Route to Get Find One Segments
router.post('/', SegmentsController.createSegments); // Route to Create Segments
router.put('/:id', SegmentsController.updateSegments); // Route to Update Segments
router.put('/enable/:id', SegmentsController.enableSegments); // Route to Enable Segments
router.put('/disable/:id', SegmentsController.disableSegments); // Route to Disable Segments

module.exports = router; //exports All Routes Segments