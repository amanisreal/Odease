const express = require('express')
const userRouter = require('./src/routes/users')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options('*', cors())
app.use(cors());

app.get('/hi', (req, res) => {
    res.send('hello');
})

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app