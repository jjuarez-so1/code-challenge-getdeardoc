const { findUserByUserName } = require('../../db/queries/userQueries');

async function requireAuth(req, res, next) {
  try {
    const  password  = req.headers.password;
    const userName = req.headers.user;
    
    console.log(`Petition received with authorizationToken ${password} and userName ${userName}`);

    const [user] = await findUserByUserName(userName, password);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = requireAuth;
