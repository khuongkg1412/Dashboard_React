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
    
    data.forEach(element => {
      var admin = new AdminModel(
        element.data().Avatar,
        element.data().Username,
        element.data().Email,
        element.data().Phone,
        element.data().Status
      );
      arrayAdmin.push(admin);
      
    });console.log(arrayAdmin.length);
  }
  res.send(arrayAdmin);
});

router.put("/enable/:email", async (req, res) => {
  const emailget = req.params.email;
  const reqDB = await AdminDB.where("Email", "==", emailget).get();
  if (!reqDB.empty) {
    await AdminDB.where("Email", "==", emailget)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update({ Status: 1 });
          res.send(true);
        });
      });
  } else {
    res.send(false);
  }
});

module.exports = router;