const app = require('express');
const studentRoute = app.Router();
const students = require('../models/studentsSchema');

studentRoute.get('/', async(req, res) => {
    console.log('req >> ', req.query);
    try {
        const {size = null, page = null} = req.query || {}
        if (size && page) {
            // Pagination call
            const studs = await students.find({})
                            .limit(size * 1)
                            .skip((page - 1) * size);
            res.send(studs)
        } else {
            // Pagination params are not provided then return all records
            const studs = await students.find({});
            res.send(studs)
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
studentRoute.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const stud = await students.findById(id)
        res.send(stud);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
// Update student
studentRoute.put('/:id', (req, res) => {
    const {id}= req.params;
    students.findByIdAndUpdate({_id: id}, req.body,{}, (err, resp) => {
        if(err) {
            res.status(500).json({message: err.message})
        }
        res.status(200).json({message: "Updated successfully"});
    })
})
studentRoute.post('/create', async(req, res) => {
    try {
        const {body = null} = req;
        if (body) {
            // Get student by name: 
            // Eliminate creation of duplicate name student
            const student = await students.find({name: body.name});
            console.log('student >> ', student);
            if ((student || []).length == 0) {
                const student = new students(req.body);
                student.save().then((result) => {
                    res.status(201).json({result})
                }).catch((err) => {
                    res.status(500).json({message: err.message});
                })
            } else {
                res.status(500).json({message: `Student with ${body.name} already exits, choose different name`});
            }
        } else {
            res.status(400).json({message: 'Body missing'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})
studentRoute.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        students.findByIdAndDelete(id, (err, resp) => {
            if(err) {
                res.status(500).json({message: err.message});
            }
            res.status(200).json({message: 'Deleted successfully'})
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
module.exports = studentRoute;