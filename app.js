const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphs = require('express-handlebars')
const path = require('path')

const connectDb = require('./config/db')
    //load config
dotenv.config({ path: './config/config.env' })

//connectDb()
//environment
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//Handlebars
app.engine('hbs', exphs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

//static
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index.js'))


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app running in ${process.env.NODE_ENV} mode on port ${port}`)
})