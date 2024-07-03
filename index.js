const express = require('express')
const userRouter = require('./src/routes/users')
const adminRouter = require('./src/routes/admins')
const foodRouter = require('./src/routes/foodItems')
const cors = require('cors')
const connectBD = require('./src/database/mongoose')

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const connection = async () => {
    try{
         connectBD(`mongodb+srv://amanborkar995:bKm6cdy7JaOziaAg@orderease.qrbx1kh.mongodb.net/?retryWrites=true&w=majority&appName=OrderEase`);
        console.log('done')
    }catch(e){
        console.log(e);
    }
}
connection();

app.use(userRouter);
app.use(adminRouter);
app.use(foodRouter)

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app