const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains id,name,email
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
