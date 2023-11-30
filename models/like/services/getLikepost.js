const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getLikepost(req,res){

    const {postId} = req.params
    try{
        const numberOfLikes = await prisma.like.count({
            where: {
              post_id: Number(postId),
            },
          });
      
          res.json({ postId, numberOfLikes });


    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getLikepost