const express = require('express');
const devicesRoute = express.Router();
const students = [
    {'id': 1, 'name':'raj'},
    {'id': 2, 'name':'ravi'},
    {'id': 3, 'name':'tej'},
];
devicesRoute.get('/', (req,res) => {
    res.send(students);
})
devicesRoute.get('/:id', (req,res) => {
    const {id} = req.params;
    const sIndex = students.findIndex((s) => s.id == id);
    if(sIndex === -1) {
        res.status(404).send(`Student with id ${req.params.id} is not found`);
    }
    res.send(students[sIndex]);
})
devicesRoute.post('/', (req,res) => {
    const s = {
        id: students.length + 1,
        name: req.body.name
    }
    students.push(s);
    res.status(200).send(s);
})
module.exports = devicesRoute;