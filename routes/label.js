const express = require('express');
const router = express.Router();
const moment = require('moment');
const Label = require('../models/Label');
const { registerLabel } = require('../validation/global');

// Create new Label
router.post('/', async (req, res) => {

    const { error } = registerLabel(req.body);
    if ( error ) return res.status(400).send({ messege: error.details[0].message });

    const label = new Label({
        name: req.body.name,
        date: req.body.date
    });

    try {
        const saveLabel = await label.save();
        res.json(saveLabel);
    } catch ( err ){
        res.json({ message : err })
    }
})

// Show List of Labels
router.get('/', async (req, res) =>{
    try {
       let labels = await Label.find({},{name: 1, date: 1, _id: 0});

       labels = labels.map((item) => {
           let date = moment(item.date).format('DD-MM-YYYY');
           let time = moment(item.date).format('HH:mm:ss . SSS');
           let newObject = item.toObject();
           newObject['date'] = date;
           newObject['time'] = time;
           return newObject;
       })
        res.json(labels)
    } catch ( err ) {
            res.json({ messege: err })
    }
});

module.exports = router;