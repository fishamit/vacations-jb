const jwt = require("jsonwebtoken");
const db = require("../utils/db");
const generateAccessToken = user => {
  const payload = {
    id: user.id,
    fname: user.first_name,
    lname: user.last_name,
    username: user.username,
    admin: user.admin,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
};

const generateRefreshToken = async uid => {
  const payload = { uid };
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1w",
  });
  await db(
    `INSERT INTO refreshtokens (user_id, token) VALUES (${uid}, "${token}")`
  );
  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
