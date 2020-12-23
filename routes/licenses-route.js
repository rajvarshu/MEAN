const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req,res) => {
    res.send("In home controller");
});
homeRouter.get('/version', (req,res) => {
    res.send("Server version 4.0.9");
})

module.exports = homeRouter;