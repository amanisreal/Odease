const express = require('express')
const userRouter = require('./src/models/user')

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter)

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})