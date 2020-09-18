const express = require('express');
const router = express.Router();


//require url db
const Url = require('../models/url');

//redirect url if its available
router.get('/:code',async (req,res)=>{
    const urlCode = req.params.code;

    try {
        const url = await Url.findOne({urlCode});
        console.log(url);
        if(url){
            console.log(url.longUrl);
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json('Url not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
});

module.exports = router;
// short url reroute to long url