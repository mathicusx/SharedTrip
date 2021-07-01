const router = require('express').Router();

router.get('/', async (req, res) => {
    const trips = await req.storage.getAllTrips();
    res.render('home', { trips });
})

module.exports = router;