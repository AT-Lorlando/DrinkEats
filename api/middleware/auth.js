const jwt = require('jsonwebtoken');
require('dotenv').config();
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Vous n'êtes pas authentifié !"
    });
    console.log('Invalid token', req.headers);
  }
};