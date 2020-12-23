const app = require('express');
const loginRoute = app.Router();
const person = require('../models/personsSchema');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

loginRoute.post('/', (req, res) => {
    console.log('In login');
    const {name = null} = req.body || {}
    if(!name) {
        res.status(403).json({message: 'name is mandatory'})
    } else {
        person.find({name})
            .exec()
            .then((result) => {
                if (result && result.length > 0) {
                    jwt.sign({name}, 'wenable', {expiresIn: '1h'}, (err, jwt) => {
                        if(err) {
                            res.status(500).json({message: err.message});
                        } else {
                            res.status(200).json({token: jwt});
                        }
                    })
                } else {
                    res.status(404).json({message: 'No record found'});
                }
            })
            .catch((err) => {
                res.status(500).json({message: err.message});
            })
    }
    // Get person from DB
})
module.exports = loginRoute;