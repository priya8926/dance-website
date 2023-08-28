// const { urlencoded } = require("body-parser");
const express = require('express');
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost/contactDance");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Define mongodb schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});
var contact = mongoose.model("contact", contactSchema);

//EXPRESS SPECIFIC STUF
app.use("/static", express.static("static")); //for serving static files means anyone can acess it download iit without sign in
app.use(express.urlencoded());
 
//  PUG SPECIFIC STUFF
app.set("view engine", "pug"); //set the template as pug
app.set("views", path.join(__dirname, "views")); // set the view directry

// END POINTS
app.get("/", (req, res) => { 
    const params = {};
    res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {}
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {
      res.send("This is item has been saved to the database");
})
.catch(() => {
      res.status(400).send("Item was not saved to the database");
    });

});
app.listen(port, () => {
    console.log(`the application is started sucessfully on port ${port}`);
});
