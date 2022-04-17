const express = require("express");
const cors = require("cors");
const db = require("../config");
var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const AdminDB = db.firestore().collection("Admin");
const AdminModel = require("../Model/admin");

/* GET admins listing. */
router.get("/", async (req, res) => {
  const data = await AdminDB.get();
  const arrayAdmin = [];
  if (data.empty) {

    res.status(404).send("No admin in list");
  } else {

    data.forEach(element => {
      console.log(element.id);
      var admin = new AdminModel(
        element.data().Avatar,
        element.data().Username,
        element.data().Email,
        element.data().Phone,
        element.data().Status,
        element.data().Password,
      );
      arrayAdmin.push(admin);

    }); console.log(arrayAdmin.length);
  }
  res.send(arrayAdmin);
});

//Add Admin
router.put("/add", async (req, res) => {
  var data = req.body;
  await AdminDB.doc().set(data);
  res.send(true);
});

// router.post("/add/uploadImage")

// Enable account by email
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

// Disable account by email
router.put("/disable/:email", async (req, res) => {
  const emailget = req.params.email;
  const reqDB = await AdminDB.where("Email", "==", emailget).get();
  if (!reqDB.empty) {
    reqDB.forEach((doc) => {
      if (doc.data().Admin_Id != 1) {
        AdminDB.where("Email", "==", emailget)
          .get()
          .then(function (querysnapshot) {
            querysnapshot.forEach(function (doc) {
              doc.ref.update({ Status: 0 });
              res.send(true);
            });
          });
      } else {
        res.send(false);
      }
    });
  } else {
    res.send(false);
  }
});

//Profile
router.get("/getAdmin/:email", async (req, res) => {
  const emailget = req.params.email;
  var adminRes;
  await AdminDB.where("Email", "==", emailget)
    .get()
    .then(function (querysnapshot) {
      querysnapshot.forEach(function (doc) {
        adminRes = doc.data();
      });
    });
  res.send(adminRes);
});

router.get("/getAdminId/:email", async (req, res) => {
  const emailget = req.params.email;
  let adminId = "";
  await AdminDB.where("Email", "==", emailget)
    .get()
    .then(function (querysnapshot) {
      querysnapshot.forEach(function (doc) {
        adminId = doc.id;
      });
    });
  res.send(adminId);
});

//Profile update
router.put("/update/:email", async (req, res) => {

  const emailget = req.params.email;
  const dataupdate = req.body;
  const reqDB = await AdminDB.where("Email", "==", emailget).get();
  if (!reqDB.empty) {
    await AdminDB.where("Email", "==", emailget)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update(dataupdate);
        });
      });
    res.send(true);
  } else {
    res.send(false);
  }
});

//change pass
router.put("/changePassword/:email/:password", async (req, res) => {
  const emailget = req.params.email;
  const passwordget = req.params.password;
  const data = await AdminDB.where("Email", "==", emailget).get();
  if (!data.empty) {
    await AdminDB.where("Email", "==", emailget)
      .get()
      .then(function (querysnapshot) {
        querysnapshot.forEach(function (doc) {
          doc.ref.update({ Password: passwordget });
          res.send(true);
        });
      });
  } else {
    res.send(false);
  }
});

module.exports = router;