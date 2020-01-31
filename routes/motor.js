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

// // Get All Data
// router.get('/:limit/:mod/:top/:byteH/:byteL', async (req, res) => {

//     let mod = req.params.mod;
//     let top = req.params.top;
//     let byteH = req.param.byteH;
//     let byteL = req.param.byteL;

//     try {
//         let data = await Data.find({ mod : mod, top: top  },{ _id : 0, __v: 0 }).sort({data_time: -1}).limit(5);
        
//         data = data.map((item) => {
//             let y = '${item.byte[byteH]}${item.byte[byteL]}';
//             console.log(y);
//             return {
//                 x : item.date,
//                 y : y
//             }
//         });

//         res.json(data);
//     } catch (err) {
//         res.json({ messege: err });
//     }
// });

module.exports = router;