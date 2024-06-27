const express = require('express')
const userRouter = require('./src/routes/users')
const cors = require('cors')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter);
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

app.get('/hi', (req, res) => {
    res.send('hello');
})

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app