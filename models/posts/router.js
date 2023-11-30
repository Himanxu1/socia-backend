const express = require('express');
const router = express.Router();
const createPost = require('./services/createPost');
const getPost = require('./services/getPost');
const getPostById = require('./services/getPostById');
const authenticate = require('../../middleware/authenticate');
const deletePost = require('./services/deletePost');
const repostPost = require('./services/repostPost');
const getRepost = require('./services/getRepost');



//  create a post
router.post('/create',async (req,res)=>{
    await createPost(req,res)
})


//  get all posts 
router.get('/' ,async (req,res)=>{
    await getPost(req,res)
})


//  get post by userId
router.get('/id/:userId',async (req,res)=>{
   
    await getPostById(req,res)
})
// delete post
router.delete('/remove/:postId',async (req,res)=>{
   
    await deletePost(req,res)
})
//  repost 
router.post('/repost',async (req,res)=>{
    await repostPost(req,res)
})

router.get('/repost/:userId',async (req,res)=>{
    await getRepost(req,res)
})

module.exports = router