const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return next(res.status(401));
  }

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      return next(res.status(401));
    }
    req.payload = payload;
    next();
  });
};

module.exports = { generateToken, verifyAccessToken };
