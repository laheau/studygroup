const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors())

const port = 8000;
const cardRouter = require('./routes/card');
const studentRouter = require('./routes/student');
const studySetRouter = require('./routes/studySet');
const courseRouter = require('./routes/course');
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});

app.use('/card', cardRouter)
app.use('/student', studentRouter)
app.use('/studySet', studySetRouter)
app.use('/course', courseRouter)
app.use('/question', questionRouter)
app.use('/answer', answerRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({message: err.message});
    return;
})

app.listen(port, () => {
    console.log(`Study app listening at http://localhost:${port}`);
})