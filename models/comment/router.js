const express = require('express');
const router = express.Router();
const postComment = require('./services/postComment');
const getComment = require('./services/getComment');



//  comment on a post
router.post('/save',async (req,res)=>{
    await postComment(req,res)
})

//  get comments for a post 
router.get('/:postId' ,async (req,res)=>{
    await getComment(req,res)
})



module.exports = router