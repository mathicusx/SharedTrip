const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest(), (req, res) => {
    res.render("register");
});

router.post(
    "/register",
    isGuest(),
    body("password")
        .isLength({ min: 4 })
        .withMessage("password must be more than 4 digits!"),
    body("confirmPassword").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Passwords don\'t match");
        }
        return true;
    }),
    async (req, res) => {
        console.log(req.body);
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
            }
            await req.auth.register(req.body.email,req.body.gender, req.body.password);

            res.redirect("/"); // change redirect page
        } catch (err) {
            console.log(err.message);
            const context = {
                errors: err.message.split('\n'),
                userData: {
                    email: req.body.email,
                    gender: req.body.gender
                },
            };
            res.render("register", context);
        }
    }
);

router.get("/login", isGuest(), (req, res) => {
    res.render("login");
});

router.post("/login", isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.email, req.body.password);

        res.redirect("/"); // change redirect page
    } catch (err) {
        console.log(err.message);
        const context = {
            errors: err.message.split('\n'),
            userData: {
                email: req.body.email,
            },
        };
        res.render("login", context);
    }
});

router.get("/logout", (req, res) => {
    req.auth.logout();
    res.redirect("/");
});

module.exports = router;
