const authCotroller = require("../controllers/authController");
const tripController = require('../controllers/tripController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
    app.use("/auth", authCotroller);
    app.use('/trip', tripController);
    app.use('/', homeController);
};
