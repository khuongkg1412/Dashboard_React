// import { getAuth } from "../firebase/auth";



const express = require("express");
const cors = require("cors");
const db = require("../config");
var router = express.Router();
const apps = express();
apps.use(express.json());
apps.use(cors());

const Auth = require("../authFirebase");


const auth = db.auth();
const user = auth.currentUser;

const listAllUsers = () => {
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
    });
  }
};

var list;
const testAdminSDK = () => {
  Auth.listUsers(1000)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        console.log(userRecord);
        console.log("\n-----");
        //list.push(userRecord);
      });
      console.log("Toplam: " + say);
      // if (listUsersResult.pageToken) {
      //   // List next batch of users.
      //   //listAllUsers(listUsersResult.pageToken)
      // }
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });
};

/* GET players listing. */
router.get("/", async (req, res) => {

  listAllUsers();
  //testAdminSDK();
  console.log(list);

  // const data = await PlayerDB.get();
  // const arrayAdmin = [];
  // if (data.empty) {

  //   res.status(404).send("No admin in list");
  // } else {

  //   data.forEach(element => {
  //     console.log(element.data());
  //   });
  // }
  //res.send(arrayAdmin);
});

module.exports = router;