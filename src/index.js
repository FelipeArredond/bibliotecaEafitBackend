const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan')
const cors = require('cors')

const taskRoutes = require('./routes/tasks.routes')

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(taskRoutes)

app.use((error, req, res, next) => {
    return res.json({
        message: error.message
    })
})

app.listen(4000);
console.log('Server on port 4000')