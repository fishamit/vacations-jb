const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/vacations", require("./vacations"));
router.use("/usersvacations", require("./usersvacations"));

module.exports = router;
