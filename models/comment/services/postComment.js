const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function postComment(req,res){
    const { userId, postId, content } = req.body;
    try{

        const user = await prisma.user.findUnique({
            where: { id: userId },
          });
      
          const post = await prisma.post.findUnique({
            where: { id: postId },
          });
      
          if (!user || !post) {
            return res.status(404).json({ error: 'User or post not found' });
          }
      
         
          const newComment = await prisma.comment.create({
            data: {
              content,
              user: { connect: { id: userId } },
              post: { connect: { id: postId } },
            },
            include:{
              user:{
                select:{
                  name:true,
                }
              }
            }
          });
      
          res.json(newComment);

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = postComment