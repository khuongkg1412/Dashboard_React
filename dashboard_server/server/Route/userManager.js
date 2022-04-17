const express = require("express");
const cors = require("cors");
const db = require("../config");
var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const PlayerDB = db.collection("Player");
const AdminModel = require("../Model/user");

/* GET players listing. */
router.get("/", async (req, res) => {
  const data = await PlayerDB.get();
  const arrayAdmin = [];
  if (data.empty) {

    res.status(404).send("No admin in list");
  } else {
    
    data.forEach(element => {
      console.log(element.data());
    });
  }
  //res.send(arrayAdmin);
});

module.exports = router;