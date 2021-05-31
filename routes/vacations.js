const router = require("express").Router();
const db = require("../utils/db");
const { authorize, authorizeAdmin } = require("../utils/authorize");

router.use(authorize);

router.get("/", async (req, res) => {
  try {
    const vacations = await db(
      `SELECT v.id vacation_id, v.description, v.destination, v.image, v.date_start, v.date_end, v.price, v.followers, uv.id uvid, uv.user_id  FROM vacations v LEFT JOIN (SELECT * FROM usersvacations WHERE user_id=${req.user.id}) uv ON v.id = uv.vacation_id ORDER BY user_id DESC, date_start ASC;`
    );
    return res.status(200).send(vacations);
  } catch (error) {
    return res.status(500).send({ message: "Server error." });
  }
});
router.get("/reports", authorizeAdmin, async (req, res) => {
  try {
    const vacations = await db(`SELECT * FROM vacations WHERE followers > 0;`);
    return res.status(200).send(vacations);
  } catch (error) {
    return res.status(500).send({ message: "Server error." });
  }
});

router.post("/", authorizeAdmin, async (req, res) => {
  const { description, destination, image, dateStart, dateEnd, price } =
    req.body;
  if (!description || !destination || !dateStart || !dateEnd || !price)
    return res.status(400).send({ message: "Missing info." });
  try {
    await db(
      `INSERT INTO vacations (description, destination, image, date_start, date_end, price) VALUES ("${description}","${destination}","${image}","${dateStart}", "${dateEnd}", ${price})`
    );
    return res.status(201).send({ message: "Vacation added." });
  } catch (error) {
    return res.status(500).send({ message: "Server error." });
  }
});

router.delete("/:vid", authorizeAdmin, async (req, res) => {
  //No ID validation because correct ID is guarenteed from React.
  try {
    await db(`DELETE FROM usersvacations WHERE vacation_id=${req.params.vid};`);
    await db(`DELETE FROM vacations WHERE id=${req.params.vid};`);
    return res.status(200).send({ message: "Vacation deleted." });
  } catch (error) {
    console.log("sads");
    return res.status(500).send({ message: "Server error." });
  }
});

router.put("/:vid", authorizeAdmin, async (req, res) => {
  const { description, destination, image, dateStart, dateEnd, price } =
    req.body;
  if (!description || !destination || !dateStart || !dateEnd || !price)
    return res.status(400).send({ message: "Missing info." });
  try {
    await db(
      `UPDATE vacations SET description="${description}", destination="${destination}", image="${image}", date_start="${dateStart}", date_end="${dateEnd}", price=${price} WHERE id=${req.params.vid};`
    );
    return res.status(200).send({ message: "Vacation updated." });
  } catch (error) {
    return res.status(500).send({ message: "Server error.", error });
  }
});

module.exports = router;
