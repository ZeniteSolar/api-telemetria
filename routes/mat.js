const express = require('express');
const router = express.Router();
const MaT = require('../models/ModuleAndTopics');



// Show list of Modules
router.get('/', async (req, res) => {
    try {
        const modules = await MaT.find({},{ name: 1, signature: 1, description: 1, _id: 0,  }).sort({ signature: 1});
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});



// Get All Modules
router.get('/mat', async (req, res) => {
    try {
        const modules = await MaT.find({},{ name: 1, signature: 1, _id: 0, 'topics.id': 1 });
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});



// Listar Tudo
router.get('/ls-all', async (req, res) => {
    try {
        const modules = await MaT.find({}).sort({ signature: 1 });
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});



// 
router.get('/topics', async (req, res) => {
    try {
        const modules = await MaT.find(
            { modules: { $elemMatch : { signature: 240 } } },
            { 'modules.name' : 1, 'modules.signature' : 1, 'modules.topics.id' : 1});
        res.json(modules);
      } catch (err) {
          res.json({ messege: err });
      }
});



// Gravar Módulos no DB
router.post('/', async (req, res) => {

        try {
            const savedData = await MaT.insertMany(req.body);
            res.json(savedData);
        } catch (err) {
            res.json({ messege: err });
        }

});

module.exports = router;