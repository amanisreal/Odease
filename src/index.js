const express = require('express')
const userRouter = require('./models/user')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter)

app.get('/hi', (req, res) => {
    res.send('Hello');
})

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})