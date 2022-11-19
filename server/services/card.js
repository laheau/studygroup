const db = require("./db");
const helper = require("../helper");

async function get(id) {
    const rows = await db.query(
        `
            SELECT card_id, question, answer, upvotes, downvotes, private, tags
            FROM card
            WHERE card_id = ${id}
        `
    );

    return {
        rows,
    }
}

async function create(card) {
    const cols = card.studySetId ? '(study_set_id, student_id, question, answer, tags)' 
                : '(student_id, question, answer, tags)';
    const vals = card.studySetId ? `('${card.studySetId}', '${card.studentId}', '${card.question}', '${card.answer}', '${card.tags}')` 
                : `('${card.studentId}', '${card.question}', '${card.answer}', '${card.tags}')`;
    const result = await db.query(
        `
            INSERT INTO card
            ${cols}
            VALUES
            ${vals};
        `
    );

    let message = 'Error in creating card';

    if (result.affectedRows) {
        message = 'Student created successfully'
    }

    return {message}
}

module.exports = {
    get,
    create
}