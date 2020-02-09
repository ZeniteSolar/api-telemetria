const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const moment = require('moment');


// Get All Data
router.get('/', async (req, res) => {

    try {
        let data = await Data.find({ mod: 240, top: 9 }).sort({date: -1}).limit(500);
        
        data = data.map((item) => {
            return {
                x : item.date,
                y : item.bytes[1]
            }
        });

        res.json(data);

    } catch (err) {
        res.json({ messege: err });
    }
});

// Get All Data
router.get('/:mod/:top/:byte', async (req, res) => {

    let mod     = req.params.mod;
    let top     = req.params.top;
    let byte    = req.params.byte;

    try {
        let data = await Data.find({ mod : mod, top: top  },{ _id : 0, __v: 0 }).sort({date: -1}).limit(500);

        data = data.map((item) => {
            return {
                x : item.date,
                y : item.bytes[byte]
            }
        });

        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

// Get All Data
router.get('/:mod/:top/:byteL/:byteH', async (req, res) => {

    let mod     = req.params.mod;
    let top     = req.params.top;
    let byteH   = req.params.byteH;
    let byteL   = req.params.byteL;

    try {
        let data = await Data.find({ mod : mod, top: top  },{ _id : 0, __v: 0 }).sort({date: -1}).limit(500);

        data = data.map((item) => {

            let L = parseInt(item.bytes[byteL], 10);
            let H = parseInt(item.bytes[byteH], 10);

            let mat = ( ( H * 256) + L ) / 100;

            return {
                x : item.date,
                y : mat
            }
        });

        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

module.exports = router;