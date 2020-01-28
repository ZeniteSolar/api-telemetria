const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const moment = require('moment');


// Get All Data
router.get('/', async (req, res) => {

    if(req.query.latestDate) {
        console.log({ lastDate : req.query.latestDate });
        try {
            let data = await Data.find({ mod : 9, data_time: { $gt : req.query.latestDate } }).sort({data_time: -1}).limit(10);
            
            data = data.map((item) => {
                let parts = item.info.match(/.{2}/g).map(byte => parseInt(byte,16));
                parts = parts.concat(Array((8 - parts.length)).fill(null));
                if( parts[1] = 240 ){
                  let motor_duty = {};
                  let motor_soft = {};
                  motor_duty ['y'] = parts[3];
                  motor_duty ['x'] = item.data_time;
                  motor_soft['y'] = parts[3];
                  motor_duty ['x'] = item.data_time;
                  

                  return motor_duty ;
                }else{
                  return ;
                }
              });
    
            res.json(data);
        } catch (err) {
            res.json({ messege: err });
        } 
    }else{
        console.log('aqui');
        try {
            let data = await Data.find({ mod : 9  }).sort({data_time: -1}).limit(100);
            
            data = data.map((item) => {
                let parts = item.info.match(/.{2}/g).map(byte => parseInt(byte,16));
                parts = parts.concat(Array((8 - parts.length)).fill(null));
                if( parts[1] = 240 ){
                  let object = {};
                  object['y'] = parts[3];
                  object['x'] = moment(item.data_time).format('YYYY-MM-DD HH:mm:ss.SSS');
                  
                  return object;
                }else{
                  return ;
                }
              });
    
            res.json(data);
        } catch (err) {
            res.json({ messege: err });
        } 
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

// Send Data
router.post('/insert/many', async (req, res) => {

    try {
        const savedData = await Data.insertMany(req.body);
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


module.exports = router;