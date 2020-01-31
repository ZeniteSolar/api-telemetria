const express = require('express');
const router = express.Router();
const Data = require('../models/Data');


// Get All Data
router.get('/', async (req, res) => {

    if (req.query.limit == null ) { req.query.limit = 250 };

    try {
        let data = await Data.find({},{ _id : 0, __v: 0 }).sort({data_time: -1}).limit(req.query.limit);
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
        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

router.get('/:mod/:top', async (req, res) => {

    try {
        let data = await Data.find({ mod: req.params.mod, top: req.params.top });        
        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

module.exports = router;