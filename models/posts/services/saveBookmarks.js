const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function saveBookmarks(req,res){

    try{
     const {userId,postId} = req.body;

     if(!userId || !postId  ){
        return res.status(400).json({message:'All field required'})
     }
    //  const existingBookmark = await prisma.bookmark.findUnique({
    //     where: {
    //       user_id_post_id: {
    //         userId,
    //         postId,
    //       },
    //     },
    //   });
  
    //   if (existingBookmark) {
    //     return res.status(400).json({ error: 'Bookmark already exists' });
    //   }
  
     
     const bookmark = await prisma.bookmark.create({
        data:{
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
     }
    })

     return  res.status(201).json("bookmark success")

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = saveBookmarks