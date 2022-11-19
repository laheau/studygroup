const db = require("./db");

async function create(studySet) {
    const cols = studySet.courseId ? '(student_id, course_id, tags)' 
        : '(student_id, tags)';
    const vals = studySet.courseId ? `('${studySet.studentId}', '${studySet.courseId}', '${studySet.tags}')` 
        : `('${studySet.studentId}', '${studySet.tags}')`;
    const result = await db.query(
        `
            INSERT INTO study_set
            ${cols}
            VALUES
            ${vals};
        `
    );

    let message = 'Error in creating study set';

    if (result.affectedRows) {
        message = 'Study set created successfully'
    }

    return {message}
}

async function getAll() {
    const result = await db.query(
        `
            SELECT *
            FROM study_set
        `
    )

    return {result}
}

async function getCards(id) {
    const result = await db.query(
        `
            SELECT *
            FROM card
            WHERE study_set_id = ${id}
        `
    )

    return {result}
}

module.exports = {
    create,
    getAll,
    getCards
}