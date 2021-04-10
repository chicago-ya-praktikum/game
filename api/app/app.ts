const express = require("express")
const app = express()
const db = require('./models/index');

db.sequelize.sync().then(() => {
    console.log('Успех')
}); 

export default app