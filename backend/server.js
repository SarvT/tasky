const mongoose = require("mongoose");
mongoose.connect (
  "mongodb://localhost:27017/",
  {
    dbName: "reg_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
//   (err) =>
//     err ? console.log(err) : console.log("Connected to reg_db database")
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // unique: false,
  },
  date: {
    type: Date,
    default: Date.now,
    // unique: false,
  },
});

const User = mongoose.model('users', UserSchema);
User.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App running...");
app.use(express.json());
app.use(cors());
app.get("/", (req, res)=>{
    res.send("Working... on http://loacalhost:5000");
});


app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.listen(5000);