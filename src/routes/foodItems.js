const FoodItem = require('../models/foodItem');
const express = require('express');
const auth = require('../middleware/auth')
const router = new express.Router;

//add food items;
router.post('/addFoodItem', async (req, res) => {
    try{
        const newFoodItem = new FoodItem(req.body);
        await newFoodItem.save();
        res.send(newFoodItem);
    }catch(e){
        res.status(400).send(e);
    }
});

//get all the food items
router.get('/allFoodItems', async (req, res) => {
    try{
        const allFood = await FoodItem.find({});
        // const allNonVeg = await FoodItem({foodCategory: "nonveg"});
        // const result = [...allVeg, ...allNonVeg];
        console.log(allFood)
        res.send(allFood);
    }catch(e){
        res.status(400).send(e);
    }
});

//edit any food item
router.patch('/editFoodItem/:id', async (req, res) => {
    const foodId = req.params._id;
    const allChangesKey = Object.keys(req.body);
    const allowedUpdated = ['foodName' ,'foodCategory', 'foodDescription', 'foodPrice'];
    const isAllowedToUpdate = allChangesKey.forEach((update) => {
        return allowedUpdated.includes(update);
    })

    try{
        if(!isAllowedToUpdate){
            throw new Error('Invalid update made');
        } 

        const foodItem = await FoodItem.find({_id: foodId});

        if(!foodItem){
            throw new Error('No such food item exists')
        }

        allChangesKey.forEach((update) => {
            foodItem[update] = req.body[update];
        })

        await foodItem.save();
        res.send(foodItem);
    }catch(e){
        res.status(400).send(e);
    }
});

//delete a particular food item
router.delete('/deleteFoodItem/:id',  async (req, res) => {
    const _id = req.params._id;
    try{
        const foodItem = await FoodItem.findByIdAndDelete({_id: _id});
        res.send(foodItem); 
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;