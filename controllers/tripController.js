const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('create');    
})

router.post('/create', isUser(), async (req, res) => {
    try {
        const tripData = {
        startPoint: req.body.startPoint,
    endPoint: req.body.endPoint,
    date: req.body.date,
    time: req.body.time,
    carImage: req.body.carImage,
    carBrand: req.body.carBrand,    
    seats: req.body.seats,
    price: req.body.price,
    description: req.body.description,
    author: req.user._id,
    passengers: [],
    };
        await req.storage.createTrip(tripData);

        res.redirect('/');

    } catch (err) {
        console.log(err.errors)
        console.log(Object.values(err.errors).map(e => e.properties.message));
        
        const ctx = {
            errors: [err.message]
        };
        res.render('create', ctx);
    }
});

router.get('/', isUser(), (req, res) => {
    res.render('trips');    
})
router.get('/details', isUser(), (req, res) => {
    res.render('details');    
})

module.exports = router;    