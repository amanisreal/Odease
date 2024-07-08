const express = require('express')
const userRouter = require('./src/routes/users')
const adminRouter = require('./src/routes/admins')
const foodRouter = require('./src/routes/foodItems')
const connectBD = require('./src/database/mongoose')

const port = process.env.PORT || 3001;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //https://odease-f.vercel.app // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*"); //Origin, X-Requested-With, Content-Type, Accept
   // Access-Control-Allow-Origin: www.other.com
   //Access-Control-Allow-Methods: GET, POST, PUT, PATCH, POST, DELETE, OPTIONS
   //Access-Control-Allow-Headers: Content-Type
   //Access-Control-Max-Age: 86400
    next();
  });
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