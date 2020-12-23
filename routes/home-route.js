const app = require('express');
const homeRouter = app.Router();

homeRouter.get('/', (req, res, next) => {
    res.send('Hello World!!');
})

module.exports = homeRouter;