const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    startPoint: {type: String, required: true, minLength: 4},
    endPoint: {type: String, required: true, minLength: 4},
    date: {type: String, required: true},
    time: {type: String, required: true },
    carImage: {type: String, required: true},
    carBrand: {type: String, required: true, minLength: 4},
    seats: {type: Number, required: true, min: 0, max: 4},
    price: {type: Number, required: true, min: 1, max: 50},
    description: {type: String, required: true, minLength: 4},
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    passengers: [{type: Schema.Types.ObjectId, ref: 'User', default: [] }]

});

module.exports = model("Trip", tripSchema);
