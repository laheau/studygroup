const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM question`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getSingle(question_id) {
    const question = await db.query(
        `SELECT * FROM question WHERE question_id = ${question_id}`
    );
    const answer = await db.query(
        `SELECT * FROM answer WHERE question_id = ${question_id}`
    );
    const data = helper.emptyOrRows(question)
    const answer_list = helper.emptyOrRows(answer);
    return {
        data, answer_list
    }
}

async function create(question) {
    const result = await db.query(
        `INSERT INTO question 
        (course_id, student_id, title, content, tags) VALUES
        ('${question.course_id}', '${question.student_id}', '${question.title}', '${question.content}', '${question.tags}')`
    );
    let message = 'Error in creating question'
    if (result.affectedRows) {
        message = 'Question created successfully'
    }
    return {message};
}

module.exports = {
    getMultiple,
    getSingle,
    create
}