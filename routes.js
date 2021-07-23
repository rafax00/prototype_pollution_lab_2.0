const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
    return res.sendFile("./index.html", {root:__dirname});
});

routes.get("/css/main.css", (req, res) => {
    return res.sendFile("./css/main.css", {root:__dirname});
});

routes.get("/js/main.js", (req, res) => {
    return res.sendFile("./js/main.js", {root:__dirname});
});


module.exports = routes;
