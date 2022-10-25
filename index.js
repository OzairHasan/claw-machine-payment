const path = require('path');
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const { Http2ServerRequest } = require('http2');
app.use(bodyParser.urlencoded({extended : true}));
var isPaymentMade = false;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/checkstatus/", (req, res) => {
    var response = 0;
    if (isPaymentMade) {
        response = 1;
        isPaymentMade = false;
    }
    res.send(response.toString());
});

app.get("/result/", (req, res) => {
    res.send("Enjoy your game!");
});

app.post("/paid/", (req, res) => {
    console.log(req.body);
    isPaymentMade = true;

    res.redirect("/result/");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});