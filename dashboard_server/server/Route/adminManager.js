const express = require("express");
const cors = require("cors");
const db = require("../config");
var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const AdminDB = db.collection("Admin");
const AdminModel = require("../Model/admin");

/* GET users listing. */
router.get("/", async (req, res) => {
  const data = await AdminDB.get();
  const arrayAdmin = [];
  if (data.empty) {

    res.status(404).send("No admin in list");
  } else {
    console.log("lalalalala");
    data.forEach(element => {
      var admin = new AdminModel(
        element.data().Avatar,
        element.data().Email,
        element.data().Phone,
        element.data().Username,
        element.data().status
      );
      arrayAdmin.push(admin);
    });
  }
  res.send(arrayAdmin);
});

router.put("/disable", async(req, res) => {
  
})

module.exports = router;