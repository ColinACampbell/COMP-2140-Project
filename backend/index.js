const express = require('express')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');
const userRoutes = require('./routes/user')
const assetRoutes = require('./routes/asset')
const feedbackRoutes = require('./routes/feedback')
const noticeRoutes = require('./routes/notice')

const app = express(); // create the app

// Extended : https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "DamPlay API",
            description: "DamPlay RESTful API Documentation",
            contact : {
                name : "Hexagrammers"
            }
        },
        servers : ["http://localhost:3000"]
    },
    apis: [`${__dirname}/routes/*.js`]
}

swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(cors({
    origin: 'http://localhost:8080',
}))

app.use('/documentation',swaggerUIExpress.serve,swaggerUIExpress.setup(swaggerDocs))

app.use(express.json());
app.use('/user',userRoutes);
app.use('/asset',assetRoutes);
app.use('/feedback',feedbackRoutes);
app.use('/notice',noticeRoutes);


const port = 3000 | process.env.PORT // define a port to listen for the process (net-centric stuff)
app.listen(port,(err)=>{
    if (err) throw err; // if there are any errors, just throw them and don't bother listen
    console.log("Server Started")
})
