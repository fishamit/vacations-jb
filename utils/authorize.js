const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(401).send({ message: "Unauthorized." });
    req.user = decoded;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user.admin) return res.status(403).send({ message: "Forbidden." });
  next();
};

module.exports = { authorize, authorizeAdmin };
