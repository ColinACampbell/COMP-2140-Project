const express = require('express')
<<<<<<< HEAD
var cors = require('cors')
=======
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');
>>>>>>> cf820128e98caaec98dc44e158e2d8b842a5c5ad
const userRoutes = require('./routes/user')
const assetRoutes = require('./routes/asset')

const app = express(); // create the app

<<<<<<< HEAD
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
=======
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

app.use('/documentation',swaggerUIExpress.serve,swaggerUIExpress.setup(swaggerDocs))

>>>>>>> cf820128e98caaec98dc44e158e2d8b842a5c5ad
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
}))

app.use('/user',userRoutes)
app.use('/asset',assetRoutes)

const port = 3000 | process.env.PORT // define a port to listen for the process (net-centric stuff)
app.listen(port,(err)=>{
    if (err) throw err; // if there are any errors, just throw them and don't bother listen
    console.log("Server Started")
})