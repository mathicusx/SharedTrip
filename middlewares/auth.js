const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { TOKEN_SECRET_KEY, COOKIE_NAME } = require("../config");
const userService = require("../services/user.js");

module.exports = () =>
    function (req, res, next) {
        if (parseToken(req, res)) {
            req.auth = {
                async register(email,gender, password) {
                    const token = await register(email,gender, password);
                    res.cookie(COOKIE_NAME, token);
                },
                async login(email, password) {
                    const token = await login(email, password);
                    res.cookie(COOKIE_NAME, token);
                },
                logout() {
                    res.clearCookie(COOKIE_NAME);
                },
            };

            next();
        }
        // attach functions to context
    };

async function register(email,gender, password) {
    //TODO add Params to Project
    //TODO Validations to project

    const existing = await userService.getUserbyEmail(email);

    if (existing) {
        throw new Error("Wrong Email or Already in Use  ");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userService.createUser(email,gender, hashedPassword);

    return generateToken(user);
}

async function login(email, password) {
    const user = await userService.getUserbyEmail(email);

    if (!email) {
        throw new Error("Email does not exist.");
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error("Incorrect Password");
    }

    return generateToken(user);
}

function logout() {}

function generateToken(userData) {
    return jwt.sign(
        {
            _id: userData._id,
            email: userData.email,
            gender: userData.gender
        },
        TOKEN_SECRET_KEY
    );
}

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET_KEY);
            req.user = userData;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect("/auth/login");

            return false;
        }
    }
    return true;
}
