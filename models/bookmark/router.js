const express = require('express');
const router = express.Router();

const getBookmarks = require('./services/getBookmarks')
const saveBookmarks = require('./services/saveBookmarks');
const removeBookmark = require('./services/removeBookmark');


//   bookmarks  a post 
router.post('/save' ,async (req,res)=>{
    await saveBookmarks(req,res)
})

//  get bookmark posts
router.get(`/:userid`,async (req,res)=>{
    await getBookmarks(req,res)
})

//  remove bookmark posts
router.delete(`/remove/:userId/:postId`,async (req,res)=>{
    await removeBookmark(req,res)
})




module.exports = router