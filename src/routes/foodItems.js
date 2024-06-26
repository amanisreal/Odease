const FoodItem = require('../models/foodItem');
const express = require('express');

const router = new express.Router;

//add food items;
router.post('/addFoodItem', auth, async (req, res) => {
    try{
        const newFoodItem = new FoodItem(req.body);
        await newFoodItem.save();
        res.send(newFoodItem);
    }catch(e){
        res.status(400).send(e);
    }
});

//get all the food items
router.post('/allFoodItems', async (req, res) => {
    try{
        const allVeg = await FoodItem({foodCategory: "veg"});
        const allNonVeg = await FoodItem({foodCategory: "nonveg"});

        res.send({allVeg, allNonVeg});
    }catch(e){
        res.status(400).send(e);
    }
});

//edit any food item
router.patch('/editFoodItem/:id', auth, async (req, res) => {
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
router.delete('/deleteFoodItem/:id', auth, async (req, res) => {
    const _id = req.params._id;
    try{
        const foodItem = await FoodItem.findByIdAndDelete({_id: _id});
        res.send(foodItem); 
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;