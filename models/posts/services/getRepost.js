const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getRepost(req,res){
     const {userId} = req.params
    try{
        const userReposts = await prisma.repost.findMany({
        where: {
            userId: Number(userId),
          },
          include: {
            post: true,
          },
        });
      
        const repostedPosts = userReposts.map((repost) => repost.post);
      
        res.send(repostedPosts);

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getRepost