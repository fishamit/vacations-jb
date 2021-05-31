const router = require("express").Router();
const db = require("../utils/db");
const { authorize } = require("../utils/authorize");

router.use(authorize);

// router.get("/", async (req, res) => {
//   try {
//     const vacations = await db(`SELECT * FROM usersvacations`);
//     return res.status(200).send(vacations);
//   } catch (error) {
//     return res.status(500).send({ message: "Server error." });
//   }
// });

router.post("/:vid", async (req, res) => {
  try {
    await db(
      `INSERT INTO usersvacations(user_id, vacation_id) values (${req.user.id},${req.params.vid})`
    );
    await db(
      `UPDATE vacations SET followers = followers + 1 WHERE id=${req.params.vid}`
    );
    return res.status(201).send({ message: "Vacation followed." });
  } catch (error) {
    return res.status(500).send({ message: "Server error." });
  }
});

router.delete("/:vid", async (req, res) => {
  try {
    await db(
      `DELETE FROM usersvacations WHERE user_id=${req.user.id} AND vacation_id=${req.params.vid}`
    );
    await db(
      `UPDATE vacations SET followers = followers - 1 WHERE id=${req.params.vid}`
    );
    return res.status(201).send({ message: "Vacation unfollowed." });
  } catch (error) {
    return res.status(500).send({ message: "Server error." });
  }
});

module.exports = router;
