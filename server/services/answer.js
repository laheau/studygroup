const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function create(answer) {
    const result = await db.query(
        `INSERT INTO answer 
        (question_id, content, student_id) VALUES
        ('${answer.question_id}', '${answer.content}', '${answer.student_id}')`
    );
    let message = 'Error in creating question'
    if (result.affectedRows) {
        message = 'Anwser created successfully'
    }
    return {message};
}

module.exports = {
    create
}