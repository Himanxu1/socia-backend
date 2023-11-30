const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getFeed(req,res){
    const userId = parseInt(req.params.userId, 10);

    try{
        const feed = await prisma.feed.findUnique({
            where: { userId },
            include: {
              posts: {
                include: {
                  author: true, // Include user details for each post
                },
              },
            },
          });
      
          res.json(feed);
      
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getFeed