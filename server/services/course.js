const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT course_id, name FROM course`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getStudySets(course_id) {
    const questions = await db.query(
        `SELECT * FROM study_set WHERE course_id = '${course_id}'`
    );
    const data = helper.emptyOrRows(questions);
    
    return {
        data
    }
}
async function getQuestions(course_id) {
    const questions = await db.query(
        `SELECT * FROM question WHERE course_id = '${course_id}'`
    );
    const data = helper.emptyOrRows(questions);
    
    return {
        data
    }
}
async function getStudents(course_id) {
    const questions = await db.query(
        `SELECT * FROM student s 
        INNER JOIN student_course sc
        ON s.student_id=sc.student_id
        INNER JOIN course c
        ON sc.course_id=c.course_id`
    );
    const data = helper.emptyOrRows(questions);
    
    return {
        data
    }
}

module.exports = {
    getMultiple,
    getQuestions,
    getStudents,
    getStudySets
}