const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const assetModel  = require('../mongo/asset');
const routes = require("../routes/asset");


app.use(bodyParser.urlencoded(
    { extended:true }

))


