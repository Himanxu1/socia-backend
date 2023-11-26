const express = require('express');
const router = express.Router();
const createPost = require('./services/createPost');
const getPost = require('./services/getPost');
const likePost = require('./services/likePost')
const getBookmarks = require('./services/getBookmarks')
const saveBookmarks = require('./services/saveBookmarks');
const getPostById = require('./services/getPostById');
const authenticate = require('../../middleware/authenticate');
const getLikepost = require('./services/getLikepost');
const unlikePost = require('./services/unlikePost');



//  create a post
router.post('/create',   authenticate,async (req,res)=>{
    await createPost(req,res)
})


// liked a post 
router.post('/like',async (req,res)=>{
    await likePost(req,res)
})

//  get numberoflikes by postid
router.get('/like/:postId' ,async (req,res)=>{
    await getLikepost(req,res)
})

//  unlike a post
router.post('/unlike',async (req,res)=>{
    await unlikePost(req,res)
})


//  get all posts 
router.get('/',  authenticate ,async (req,res)=>{
    await getPost(req,res)
})

//   bookmarks  a post 
router.post('/bookmark', authenticate ,async (req,res)=>{
    await saveBookmarks(req,res)
})

//  get bookmark posts
router.get(`/bookmark/:userid`,  authenticate,async (req,res)=>{
    await getBookmarks(req,res)
})


//  get post by userId
router.get('/id/:userId', authenticate,async (req,res)=>{
   
    await getPostById(req,res)
})

module.exports = router