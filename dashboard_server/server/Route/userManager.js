const express = require("express");
const cors = require("cors");
const db = require("../config");
var router = express.Router();
const apps = express();
apps.use(express.json());
apps.use(cors());


const Auth = require("../authFirebase");
const PlayerDB = db.firestore().collection("Player");
const UserModel = require("../Model/user");
const AuthModel = require("../Model/auth");


/* GET players listing. */
router.get("/", async (req, res) => {
  const listAuth = new Array();
  const arrayPlayer = [];

  //get all current Account
  async function listAllAuth() {
    await Auth.auth().listUsers(50)
      .then((listUsersResult) => {
        listUsersResult.users.forEach(userRecord => {
          var CreateTimeString = userRecord.metadata.creationTime;
          var SignInTimeString = userRecord.metadata.creationTime;
          const str = CreateTimeString.split(' ');
          const str1 = SignInTimeString.split(' ');

          var playerAuth = new AuthModel(
            str[1] + '-' + str[2] + '-' + str[3],
            str1[1] + '-' + str1[2] + '-' + str1[3],
            userRecord.disabled,
            userRecord.uid
          );
          listAuth.push(playerAuth)
        });
      })
  };

  await listAllAuth();

  const data = await PlayerDB.get();

  //Get all created characters
  if (data.empty) {
    res.status(404).send("No Player in list");
  } else {

    //check accout have character
    data.forEach(element => {
      listAuth.forEach(e => {
        if (e.Id == element.id) {
          var player = new UserModel(
            element.data().generalInformation.username_Player,
            e.Createdate,
            e.SignIn,
            element.data().level.level,
            element.data().level.stage,
            e.Status,
            e.Id
          );
          arrayPlayer.push(player)
        }
      })
    });
  }
  res.send(arrayPlayer);
});

// Enable account by UID
router.put("/enable/:UID", async (req, res) => {
  const UIDget = req.params.UID;
  Auth.auth().updateUser(UIDget, {
    disabled: false,
  })
  res.send(true)
});

// Disable account by UID
router.put("/disable/:UID", async (req, res) => {
  const UIDget = req.params.UID;
  Auth.auth().updateUser(UIDget, {
    disabled: true,
  })
  res.send(true)
});

module.exports = router;