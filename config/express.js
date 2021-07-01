const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");

const authMiddleware = require("../middlewares/auth");
const storageMiddleware = require('../middlewares/storage');

//app.use('/assets', express.static(path.join(__dirname, "../assets")));

module.exports = (app) => {
    app.engine(
        "hbs",
        hbs({
            extname: "hbs",
        })
    );
    app.set("view engine", "hbs");

    app.use("/static", express.static("static"));

    app.use(express.urlencoded({ extended: true })); // this is also a body-parser
    app.use(cookieParser());
    app.use(authMiddleware());

    app.use((req, res, next) => {
        console.log(">>>", req.method, req.url);

        if (req.user) {
            console.log("Bearer", req.user.email);
        }

        next();
    });
    app.use(storageMiddleware());
};
