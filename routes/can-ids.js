const express = require('express');
const router = express.Router();
const AllModule = require('../models/AllModules');
// const { registerModule } = require('../validation/module');

// Get All Modules
router.get('/modules', async (req, res) => {
    try {
        const modules = await AllModule.find(
            { modules: { $elemMatch : { signature: 240 } } },
            { 'modules.name' : 1, 'modules.description' : 1, 'modules.signature' : 1});
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});

router.get('/topics', async (req, res) => {
    try {
        const modules = await AllModule.find(
            { modules: { $elemMatch : { signature: 240 } } },
            { 'modules.name' : 1, 'modules.signature' : 1, 'modules.topics.id' : 1});
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});

// Create a New Module
router.post('/', async (req, res) => {

    // Create new Módule
        const module = new AllModule(req.body)

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