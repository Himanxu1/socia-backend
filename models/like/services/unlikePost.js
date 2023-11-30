const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function unlikePost(req,res){
    const {userId,postId} = req.body

    try{
        const deletedLikes = await prisma.like.deleteMany({
            where: {
              post_id: postId,
              user_id: userId,
            },
          });
 

          return res.status(200).json("unliked success")

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = unlikePost