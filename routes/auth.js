const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokens");

router.post("/register", async (req, res) => {
  const { fname, lname, username, password } = req.body;
  if (!fname || !lname || !username || !password)
    return res.status(400).send({ message: "Missing information." });
  try {
    const user = await db(`SELECT * FROM users WHERE username="${username}"`);
    if (user[0])
      return res.status(400).send({ message: "Username already exists." });
    const hash = await bcrypt.hash(password, 10);
    await db(
      `INSERT INTO users (first_name, last_name, username, hash) values ("${fname}","${lname}","${username}","${hash}")`
    );
    return res.status(200).send({ message: "User created." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ message: "Missing information." });
  try {
    const user = await db(`SELECT * FROM users WHERE username="${username}"`);
    if (!user[0])
      return res.status(400).send({ message: "Wrong username or password." });
    const result = await bcrypt.compare(password, user[0].hash);
    if (!result)
      return res.status(400).send({ message: "Wrong username or password." });
    const accessToken = generateAccessToken(user[0]);
    const refreshToken = await generateRefreshToken(user[0].id);
    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error." });
  }
});

//takes a refreshToken in req.body and invalidates it. (deletes from db)
router.post("/invalidate", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).send({ message: "Missing information." });
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (error, decoded) => {
      if (error) {
        if (error.name !== "TokenExpiredError")
          return res.status(401).send({ message: "Invalid token." });
      }
      await db(`DELETE FROM refreshtokens WHERE token="${refreshToken}"`);
      return res.status(200).send({ message: "Token invalidated." });
    }
  );
  try {
  } catch (error) {
    return res.status(500).send({ message: "Server error." });
  }
});

//takes a refreshToken in req.body and returns new access and refresh tokens, provided it is valid
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).send({ message: "Missing information." });
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (error, decoded) => {
      if (error) return res.status(400).send({ message: "Invalid token." });
      try {
        const existingToken = await db(
          `SELECT * FROM refreshtokens WHERE token="${refreshToken}"`
        );
        if (!existingToken[0])
          return res.status(401).send({ message: "Invalid token." });
        await db(`DELETE FROM refreshtokens WHERE token="${refreshToken}"`);
        const user = await db(`SELECT * FROM users WHERE id="${decoded.uid}"`);
        const newAccessToken = generateAccessToken(user[0]);
        const newRefreshToken = await generateRefreshToken(user[0].id);
        return res.status(200).send({ newAccessToken, newRefreshToken });
      } catch (error) {
        return res.status(500).send({ message: "Server error." });
      }
    }
  );
});

module.exports = router;
