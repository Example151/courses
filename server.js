// Start
// const http = require("http");

// const courses = [
//     {id: 1, name: "Course 1"},
//     {id: 2, name: "Course 2"},
//     {id: 3, name: "Course 3"}
// ];

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         "Content-Type": "applications/json",
//         'X-Powered-By': 'Node.js'
//     });

//     res.end(JSON.stringify({
//         success: true,
//         data: courses
//     }));
// });

const express = require('express')
const dotenv = require("dotenv");
const mongoose = require('mongoose')

dotenv.config();

const server = express()

server.use(express.json());

// const courses = [
//     {id: 1, name: "Course 1"},
//     {id: 2, name: "Course 2"},
//     {id: 3, name: "Course 3"}
// ]

// server.get('/', (req, res) => {
//     res.send('Chao ban');
// });

// server.get('/api/courses', (req, res) => {
//     res.send(courses);
// });

// server.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) res.status(404).send('Course not found');

//     res.send(course);
// });

// server.post('/api/courses/add', (req, res) => {
//     const course = {
//         id: req.body.id,
//         name: req.body.name
//     };
//     courses.push(course);

//     res.send(JSON.stringify({
//         success: true,
//         message: 'Course added successfully',
//         data: courses
//     }));
// });

// server.put('/api/courses/edit/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) res.status(404).send('Course not found');

//     course.name = req.body.name;

//     res.send(JSON.stringify({
//         success: true,
//         message: 'Course edited successfully',
//         data: courses
//     }));
// });

// server.delete('/api/courses/delete/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) res.status(404).send('Course not found');

//     let index = courses.indexOf(course);
//     courses.splice(index, 1);

//     res.send(JSON.stringify({
//         success: true,
//         message: 'Course deleted successfully',
//         data: courses
//     }));
// });

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

server.use('/api/v1', require('./routes'));

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
