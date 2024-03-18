import express from 'express'
import mongodb from './config/db.js'
import router from './routes/index.js'
import cors from 'cors'

mongodb.connection.on('connected', () => console.log('db connected')).on("error", (err) => console.log("error connecting db -->", err))

const app =express()

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`Server runnig at port ${port}`)
})


app.use(cors())
app.use(express.json())

//GET, POST, PUT, DELETE
app.use('/' , router)