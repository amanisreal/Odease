const express = require('express')
const userRouter = require('./src/routes/users')
const adminRouter = require('./src/routes/admins')
const cors = require('cors')
const connectBD = require('./src/database/mongoose')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



const connection = async () => {
    try{
        await connectBD(`mongodb+srv://amanborkar995:bKm6cdy7JaOziaAg@orderease.qrbx1kh.mongodb.net/?retryWrites=true&w=majority&appName=OrderEase`);
        console.log('done')
    }catch(e){
        console.log(e);
    }
}
connection();

app.use(userRouter);
app.use(adminRouter);

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app