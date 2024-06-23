const mongoose = require('mongoose');

const foodItemSchems = mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },

    foodCategory: {
        type: String,
        required: true
    },

    foodDescription: {
        type: String,
        required: true,
    },

    foodPrice: {
        type: String,
        required: true,
    },

})

const FoodItem = new mongoose.model('foodItems', foodItemSchems);

module.exports = FoodItem;