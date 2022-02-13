const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const items = [];
const work = [];
const app = express();
// need to create a new folder called views
app.set('view engine', 'ejs'); // to use ejs to create template

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    text = date.getDate();
    res.render('list', {listTitle: text, newListItem: items});
});

app.post("/", function(req, res) {
    let task = req.body.task;
    if (req.body.list === "Work List"){
        work.push(task);
        res.redirect("/work");
    } else {
        items.push(task);
        res.redirect("/");
    }
});

app.get("/work", function(req, res) {
    res.render('list', {listTitle: "Work List", newListItem: work});
})

// app.post("/work", function(req, res) {
//     const task = req.body.task;
//     work.push(task);
//     res.redirect("/work");
// })

app.listen(3000, function() {
    console.log("Server running on port 3000");
});