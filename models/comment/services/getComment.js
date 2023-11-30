const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getComment(req,res){
    const postId = parseInt(req.params.postId, 10);
    try{

    const comments = await prisma.comment.findMany({
        where: { 
            postId: postId 
        },
        include: {
          user: {
            select:{
                name:true
            
            }
          } 
        },
      });
  
      res.json(comments);


    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getComment