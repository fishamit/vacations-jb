const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 1000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Listening @${port}`);
});
