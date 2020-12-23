const app = require('express');
const personsRoute = app.Router();
const personsSchema = require('../models/personsSchema');

// Get persons with pagination params
personsRoute.get('/', async(req, res) => {
    console.log('req >> ', req.query);
    try {
        const {size = null, page = null} = req.query || {}
        if (size && page) {
            // Pagination call
            const persons = await personsSchema.find({})
                            .limit(size * 1)
                            .skip((page - 1) * size);
            res.send(persons)
        } else {
            // Pagination params are not provided then return all records
            const persons = await personsSchema.find({});
            res.send(persons)
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
// Get all persons
personsRoute.get('/all', async (req, res) => {
    try {
        const persons = await personsSchema.find({})
        res.send(persons)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
// Get individual person by mongoDB id
personsRoute.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const person = await personsSchema.findById(id)
        res.send(person);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
// Insert a person
personsRoute.post('/create', (req, res) => {
    try {
        const person = new personsSchema(req.body);
        person.save((err, resp) => {
            if (err) {
                res.status(500).json({message: err.message}); 
            }
            console.log('resp >> ', resp);
            res.status(200).json({message: 'Inserted successfully'});
        })
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
// Update person
personsRoute.put('/:id', (req, res) => {
    const {id}= req.params;
    personsSchema.findByIdAndUpdate({_id: id}, req.body,{}, (err, resp) => {
        if(err) {
            res.status(500).json({message: err.message})
        }
        res.status(200).json({message: "Updated successfully"});
    })
})
// Delete person
personsRoute.delete('/:id', (req, res) => {
    const {id} = req.params;
    try {
        personsSchema.findByIdAndDelete(id, (err, resp) => {
            if(err) {
                res.status(500).json({message: err.message});
            }
            res.status(200).json({message: 'Deleted successfully'})
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
module.exports = personsRoute;