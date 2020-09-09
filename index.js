const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const todoRoutes = require('./routes/todo')
const app = express()


app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use('/api/todo', todoRoutes)

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

async function start(PORT = process.env.PORT || 3000) {
    try {
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
