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


const arrayPlayer = [];
/* GET players listing. */
router.get("/", async (req, res) => {
  const listAuth = [];
  //listAuth = [];
  async function listAllAuth() {
    await Auth.auth().listUsers(50)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
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
          //console.log(playerAuth);
        }); //
      })

  };

  listAllAuth();

  console.log(",d;,asd,ads");
  console.log(listAuth.length);

  const data = await PlayerDB.get();

  if (data.empty) {
    //console.log("something wrong");
    res.status(404).send("No Player in list");
  } else {
    data.forEach(element => {
      listAuth.forEach(e => {
        if (e.uid == element.id) {
          //console.log(e.uid);

          // var player = new UserModel(
          //   element.data().generalInformation.username_Player,
          //   str[1] + '-' + str[2] + '-' + str[3],
          //   str1[1] + '-' + str1[2] + '-' + str1[3],
          //   element.data().level.level,
          //   element.data().level.stage,
          //   e.disabled,
          //   e.uid
          // );
          // console.log(CreateTimeString);
          // arrayPlayer.push(player)
        }
      })


      // if (found != "undefined") {

      //   var CreateTimeString = userRecord.metadata.creationTime;
      //   var SignInTimeString = userRecord.metadata.creationTime;

      //   const str = CreateTimeString.split(' ');
      //   const str1 = SignInTimeString.split(' ');

      //   var player = new UserModel(
      //     element.data().generalInformation.username_Player,          
      //     str[1] + '-' + str[2] + '-' + str[3],
      //     str1[1] + '-' + str1[2] + '-' + str1[3],
      //     element.data().level.level,
      //     element.data().level.stage,
      //     found.disabled,
      //     found.uid
      //   );
      //   arrayPlayer.push(player)
      // }
    });
  }
  res.send(arrayPlayer);
});

module.exports = router;