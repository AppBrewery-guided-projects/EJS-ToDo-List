const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var items = ["Buy Food",
    "Cook Food ",
    "Eat Food "
];
var workItems = [];

app.listen(3000, () => {
    console.log("the server is up and running");
});

app.get("/", (req, res) => {
    const list = date.getDate();
    res.render("list", {
        typeOfList: list,
        items: items
    });
});

app.post("/", (req, res) => {
    console.log(req.body);
    if (req.body.list == "work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    const list = "work";

    res.render("list", {
        typeOfList: list,
        items: workItems
    })
})