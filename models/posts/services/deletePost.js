const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function deletePost(req,res){

    try{
     const {postId} = req.params;

     if(!postId  ){
        return res.status(400).json({message:'All field required'})
     }


     const transaction = await prisma.$transaction([


         // Delete likes related to the post
     prisma.like.deleteMany({
        where: { 
            post_id: Number(postId) 
        },
      }),

       prisma.comment.deleteMany({
        where: { 
            postId: Number(postId) 
        },
      }),
  
     prisma.bookmark.deleteMany({
        where: { 
            post_id: Number(postId) 
        },
      }),

      prisma.post.delete({
        where:{
            id:Number(postId)
        }
     })
    ])
     return  res.status(201).json("post delete success")

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = deletePost