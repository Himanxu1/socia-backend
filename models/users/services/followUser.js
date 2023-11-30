
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function followUser(req,res){
    const { userId, followerId } = req.body;

    try{
    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      const follower = await prisma.user.findUnique({
        where: { id: parseInt(followerId) },
      });
  
      if (!user || !follower) {
        return res.status(404).json({ error: 'User or follower not found' });
      }
  
      // Update the database (Prisma operation)
      await prisma.user.update({
        where: { 
          id: parseInt(followerId) 
        },
        data: {
          followers: {
            connect: {
               id: parseInt(userId)
               },
          },
        },
      });

      await prisma.user.update({
        where: { 
          id: parseInt(userId)
         },
        data: {
          following: {
            connect: { id: parseInt(followerId) },
          },
        },
      });

      
  
      res.json({ message: 'User followed successfully' });
       
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = followUser