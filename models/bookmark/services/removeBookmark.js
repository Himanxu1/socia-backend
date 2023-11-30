const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function removeBookmark(req,res){

    try{
     const {userId,postId} = req.params;

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
  
     
     const removedBookmark = await prisma.bookmark.delete({
       where:{
        user_id_post_id: {
            user_id: parseInt(userId),
            post_id: parseInt(postId),
          },
       }
    })

     return  res.status(201).send(removedBookmark)

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = removeBookmark