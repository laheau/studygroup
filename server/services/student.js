const db = require("./db");

async function create(student) {
    const result = await db.query(
        `
            INSERT INTO student
            (first_name, last_name)
            VALUES
            ('${student.firstName}', '${student.lastName}');
        `
    );

    let message = 'Error in creating student';

    if (result.affectedRows) {
        message = 'Student created successfully'
    }

    return {message}
}

async function get(id) {
    const result = await db.query(
        `
            SELECT first_name, last_name
            FROM student
            WHERE student_id = ${id}
        `
    )

    return {result}
}

async function getCards(id) {
    const result = await db.query(
        `
            SELECT *
            FROM card
            WHERE student_id = ${id}
        `
    )

    return {result}
}

async function getStudySets(id) {
    const result = await db.query(
        `
            SELECT *
            FROM study_set
            WHERE student_id = ${id}
        `
    )

    return {result}
}

module.exports = {
    create,
    get,
    getCards,
    getStudySets
}