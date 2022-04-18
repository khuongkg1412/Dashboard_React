const express = require("express");
const cors = require("cors");
const db = require("../config");

const app = express();
app.use(express.json());
app.use(cors());
const PlayerDB = db.firestore().collection("Player");
const AchievementDB = db.firestore().collection("Achievement");
const ItemDB = db.firestore().collection("Item");

var router = express.Router();

const Auth = require("../authFirebase");


router.get("/", async (req, res) => {

    const chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    await listAllAuth();
    //get all current Account
    async function listAllAuth() {
        await Auth.auth().listUsers(50)
            .then((listUsersResult) => {
                listUsersResult.users.forEach(userRecord => {
                    var CreateTimeString = userRecord.metadata.creationTime;
                    const str = CreateTimeString.split(' ');

                    var currentData = new Date();
                    var year = currentData.getFullYear();
                    
                    if (year == str[3]) {
                        switch (str[2]) {
                            case "Jan":
                                chartData[0] += 1;
                                break;
                            case "Feb":
                                chartData[1] += 1;
                                break;
                            case "Mar":
                                chartData[2] += 1;
                                break;
                            case "Apr":
                                chartData[3] += 1;
                                break;
                            case "May":
                                chartData[4] += 1;
                                break;
                            case "Jun":
                                chartData[5] += 1;
                                break;
                            case "Jul":
                                chartData[6] += 1;
                                break;
                            case "Aug":
                                chartData[7] += 1;
                                break;
                            case "Sep":
                                chartData[8] += 1;
                                break;
                            case "Oct":
                                chartData[9] += 1;
                                break;
                            case "Nov":
                                chartData[10] += 1;
                                break;
                            case "Dec":
                                chartData[11] += 1;
                                break;
                        }
                    }
                });
            });
    };
    res.send(chartData);
});

router.get("/statictis", async (req, res) => {
    const Statictis = [0, 0, 0, 0];

    await listAllAuth();
    await listAllStatictis();

    async function listAllAuth() {
        await Auth.auth().listUsers(50)
            .then((listUsersResult) => {
                listUsersResult.users.forEach(userRecord => {
                    Statictis[0] += 1 ;
                });
            });
    };

    //get all current Account
    async function listAllStatictis() {
        const PlayerSize = await PlayerDB.get();
        const ItemSize = await ItemDB.get();
        const AchieveSize = await AchievementDB.get();

        Statictis[1] = PlayerSize.size;
        Statictis[2] = ItemSize.size;
        Statictis[3] = AchieveSize.size;
    };
    res.send(Statictis);
});

module.exports = router;