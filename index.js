const express = require('express')
const userRouter = require('./src/routes/users')
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
const corseOption = {
    origin: '*',
    Credentials: true,
    OptionSuccessStatus: 200,
}

app.use(cors(corseOption))

app.use(cors());

app.use(userRouter);


const connection = async () => {
    try{
        await connectBD(`mongodb+srv://amanborkar995:bKm6cdy7JaOziaAg@orderease.qrbx1kh.mongodb.net/?retryWrites=true&w=majority&appName=OrderEase`);
        console.log('done')
    }catch(e){
        console.log(e);
    }
}
connection();
app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app