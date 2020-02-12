const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const aqp = require('api-query-params');
const moment = require('moment');


// Get All Data
router.get('/', async (req, res) => {

    let { filter, skip, limit, sort, projection, population } = aqp(req.query);

    if ( filter.date != null ) {
        filter.date['$gt'] = ( filter.date['$gt'] == null ) ? "2000-01-01 00:00:00.000" : moment(filter.date["$gt"]).format('YYYY-MM-DD HH:mm:ss.SSS');
        filter.date['$lt'] = ( filter.date['$lt'] == null ) ? "2500-12-31 23:59:59.000" : moment(filter.date["$lt"]).format('YYYY-MM-DD HH:mm:ss.SSS');
    }
    
    limit = ( limit == null ) ? 500 : limit ;
    sort = ( sort == null ) ? '-date' : sort ;
    projection = ( projection == null ) ? '-__v' : projection ;

    try {
        let data = await Data.find(filter).skip(skip).limit(limit).sort(sort).select(projection).populate(population);
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

    if (req.query.limit == null ) { req.query.limit = 200 };

    try {
        let data = await Data.find({ mod: req.params.mod }).sort({date: -1}).limit(req.query.limit);        
        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

router.get('/:mod/:top', async (req, res) => {
    
    if (req.query.limit == null ) { req.query.limit = 200 };
    try {
        let data = await Data.find({ mod: req.params.mod, top: req.params.top }).sort({date: -1}).limit(req.query.limit);        
        res.json(data);
    } catch (err) {
        res.json({ messege: err });
    }
});

module.exports = router;