const express = require('express');
const router = express.Router();
const getFeed = require('./services/getFeed')




// get feed 
router.get('/:userId',async (req,res)=>{
    await getFeed(req,res)
})

module.exports = router