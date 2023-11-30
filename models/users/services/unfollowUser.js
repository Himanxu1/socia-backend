
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function unfollowUser(req,res){
    const { userId, followerId } = req.body;

    try{
     // Fetch the user and follower
     const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      const follower = await prisma.user.findUnique({
        where: { id: parseInt(followerId) },
      });
  
      if (!user || !follower) {
        return res.status(404).json({ error: 'User or follower not found' });
      }
  
      // Remove the follower from the user's followers
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          followers: {
            disconnect: { id: parseInt(followerId) },
          },
        },
      });
  
      // Remove the user from the follower's following
      await prisma.user.update({
        where: { id: parseInt(followerId) },
        data: {
          following: {
            disconnect: { id: parseInt(userId) },
          },
        },
      });
  
      res.json({ message: 'User unfollowed successfully' });
       
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = unfollowUser