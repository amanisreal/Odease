const mongoose = require('mongoose');

const foodItemSchems = new mongoose.Schema({
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

    foodImage:{
        type: String,
    }

})

const FoodItem = mongoose.model('foodItems', foodItemSchems);

module.exports = FoodItem;