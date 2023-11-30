const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function repostPost(req,res){

    const { userId,postId } = req.body; 
    try{
          // Check if the post exists
          const post = await prisma.post.findUnique({
            where: { id: postId },
          });
      
          if (!post) {
            return res.status(404).json({ error: 'Post not found' });
          }

          const existingRepost = await prisma.repost.findFirst({
            where: {
             userId :userId,
             postId:postId
            },
          });
      
          if (existingRepost) {
            return res.status(400).json({ error: 'Repost already exists' });
          }
          // Create a new repost entry
          const repost = await prisma.repost.create({
            data: {
              user: { connect: { id: userId } },
              post: { connect: { id: postId } },
            },
          });
      
          res.json({ message: 'Post reposted successfully', repost });
 

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = repostPost