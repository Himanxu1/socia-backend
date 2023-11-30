const express = require('express');
const router = express.Router();
const likePost = require('./services/likePost')
const getLikepost = require('./services/getLikepost');
const unlikePost = require('./services/unlikePost');


// liked a post 
router.post('/',async (req,res)=>{
    await likePost(req,res)
})

//  get numberoflikes by postid
router.get('/id/:postId' ,async (req,res)=>{
    await getLikepost(req,res)
})

//  unlike a post
router.post('/unlike',async (req,res)=>{
    await unlikePost(req,res)
})


module.exports = router