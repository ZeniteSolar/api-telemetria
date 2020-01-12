const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const anyBase = require('any-base');

hex2bin = anyBase(anyBase.HEX, anyBase.BIN);
dec2bin = anyBase(anyBase.DEC, anyBase.BIN);

// Get All Data
router.get('/', async (req, res) => {
    try {
        let data = await Data.find();
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

    const data = new Data({
        ts: req.body.ts,
        ts_u: req.body.ts_u,
        ts_complete: req.body.ts_complete,
        data_time: req.body.data_time,
        mod: req.body.mod,
        info: req.body.info
    })

    try {
        const savedData = await data.save();
        res.json(savedData);
    } catch (err) {
        res.json({ messege: err });
    }

});

// Get a Specific Data
router.get('/:mod', async (req, res) => {
    let moduleId = req.params.mod;
    try {
        let data = await Data.find({ mod: moduleId });

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


// Delete Data
router.delete('/:dataId', async (req, res) => {
    try {
        const removedData = await Data.deleteOne({ _id: req.params.dataId });
        res.json(removedData);
    } catch (err) {
        res.json({ messege: err });
    }
});

// Update Data
router.patch('/:dataId', async (req, res) => {
    try {
        const updatedData = await Data.updateOne(
            { _id: req.params.dataId },
            { $set: {} });
        res.json(updatedData);
    } catch (err) {
        res.json({ messege: err });
    }
});

const changeEndianness = (string) => {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
      result.push(string.substr(len, 2));
      len -= 2;
    }
    return result.join('');
}


module.exports = router;