    const Trip = require('../models/Trip');

    async function getAllTrips() {
        return Trip.find({}).lean();

    }

    async function getTripById(id) {

    }

    async function createTrip(tripData) {
        const trip = new Trip(tripData);
        
        await trip.save();

        return trip;
    }

    async function editTrip(id, tripData) {

    }

    async function deleteTrip(id) {

    }

    module.exports = {
        getAllTrips,
        getTripById,
        createTrip,
        editTrip,
        deleteTrip,
    }