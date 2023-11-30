
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getUserData(req,res){
    const userId = parseInt(req.params.userId, 10);

    try{
      const userData = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          followers: {
            select:{
              id:true
            }
          },
          following :{
            select:{
              id:true
            }
          },
          post: true,
        },
      });
  
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      const numberOfFollowers = userData.followers.length;
      const numberOfFollowing = userData.following.length;
      const numberOfPosts = userData.post.length;
      const follower = userData.followers
      const following = userData.following
  
      res.json({
        userId: userData.id,
        numberOfFollowers,
        numberOfFollowing,
        numberOfPosts,
        follower,
        following
      });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getUserData