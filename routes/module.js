const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const { registerModule } = require('../validation/module');

// Get All Modules
router.get('/', async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});

// Create a New Module
router.post('/', async (req, res) => {

    // Validation
        const { error } = registerModule(req.body);
        if ( error ) return res.status(400).send(error.details[0].message+" 1");

    // Create new Módule
        const module = new Module({
            name: req.body.name,
            description: req.body.description,
            signature: req.body.signature
        })

    try {
        const savedModule = await module.save();
        res.json(savedModule);
    } catch (err) {
        res.json({ messege: err +" 1" });
    }

});

// Get a Specific Module
router.get('/:signature', async (req, res) => {
    try {
        const modules = await Module.find({ signature: req.params.signature });
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});


// Delete an Module
router.delete('/:signature', async (req, res) => {
    try {
        const removedData = await Data.deleteOne({ signature: req.params.signature });
        res.json(removedData);
    } catch (err) {
        res.json({ messege: err });
    }
});

// Update an Module
router.patch('/:signature', async (req, res) => {
    try {
        const updatedData = await Data.updateOne(
            { signature: req.params.signature },
            { $set: {} });
        res.json(updatedData);
    } catch (err) {
        res.json({ messege: err });
    }
});

module.exports = router;