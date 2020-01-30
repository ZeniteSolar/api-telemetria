const express = require('express');
const router = express.Router();
const Data = require('../models/Data');


// Get All Data
router.get('/', async (req, res) => {
    try {
        let data = await Data.find().sort({data_time: -1}).limit(100);
        
        data = data.map((item) => {
            let parts = item.info.match(/.{2}/g).map(byte => parseInt(byte,16));
            parts = parts.concat(Array((8 - parts.length)).fill(null));
            let newObject = item.toObject();
            newObject['byte'] = parts;
            return newObject;
          });

        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    } 
});


// Send Data
router.post('/', async (req, res) => {

    let parts = req.body.info.match(/.{2}/g).map(byte => parseInt(byte,16));
    
    let result = new Data ({
        date : req.body.data_time,
        mod : parts[0],
        top : parseInt(req.body.mod, 16),
        bytes: parts.slice(1)
    })

    try {
        const savedData = await result.save();
        res.json(savedData);
    } catch (err) {
        res.json({ messege: err });
    }

});

// Send Many Data
router.post('/insert/many', async (req, res) => {

    let result = req.body.map(item => {
        let parts = item.info.match(/.{2}/g).map(byte => parseInt(byte,16));
        return {
            date : item.data_time,
            mod : parts[0],
            top : parseInt(item.mod, 16),
            bytes: parts.slice(1)
        }
    })

    try {
        const savedData = await Data.insertMany(result);
        res.json(savedData);
    } catch (err) {
        res.json({ messege: err });
    }

});

// Get a Specific Data
router.get('/:mod', async (req, res) => {

    try {
        let data = await Data.find({ mod: req.params.mod });

        data = data.map((item) => {
            let parts = item.info.match(/.{2}/g).map(byte => parseInt(byte,16));
            parts = parts.concat(Array((8 - parts.length)).fill(null));
            let newObject = item.toObject();
            newObject['byte'] = parts;
            return newObject;
          });
        
        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

module.exports = router;