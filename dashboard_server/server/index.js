const express = require("express");
const cors = require("cors");
const db = require("./config");

const app = express();
app.use(express.json());
app.use(cors());
const AdminDB = db.collection("Admin");
var router = express.Router();

var userSession;

router.get("/session", async (req, res) => {
    req.session.viewCount++;
    console.log("okokok");
    console.log(req.session);
    res.send(req.session);
});

router.get('/logout', async (req,res) => {
    req.session.destroy(function(err) {
        return res.status(200).json({status: 'success', session: 'cannot access session here'})
    })
});


//get session
app.get('/get_session',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send(true);
    }else{
        res.send(false);
    }
});

router.get("/login/:username/:password", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const DBUsername = await AdminDB.where('Email','==',username).get();
    console.log(DBUsername.empty);
    if(!DBUsername.empty){
        DBUsername.forEach(doc => {
            
           if(doc.data().Password == password){
            
            userSession=req.session;
            userSession.userId = req.params.username;
            console.log(req.session);
            console.log(userSession);
            res.send(true);
           }else{
            res.send(false);
           }
          });
        
    }else{
        res.send(false);
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;