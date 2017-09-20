const express = require('express');
const router = express.Router();
const Baker = require('../models/baker');

router.get('/bakers', function(req,res,next){
    Baker.find({}).then(function(bakers){
        res.send(bakers);
    });
});

router.post('/bakers', function(req,res,next){
    Baker.create(req.body).then(function(baker){
        res.send(bakers);
    }).catch(next);
});

router.put('/bakers/:id', function(req,res,next){
    Baker.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Baker.findOne({_id: req.params.id}).then(function(baker){
            res.json(baker);
        });
    });
});

router.delete('/bakers/:id', function(req,res,next){
    Baker.findByIdAndRemove({_id: req.params.id}).then(function(baker){
        res.send(baker);
    });
});


module.exports = router;
