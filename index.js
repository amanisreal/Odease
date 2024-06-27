const express = require('express')
const userRouter = require('./src/routes/users')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter)

app.get('/hi', (req, res) => {
    res.send('hello');
})

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app