const addFeedback = `
    INSERT INTO feedback (name, email, message)
    VALUES ($1, $2, $3)
    RETURNING *;
`;

module.exports = {
  addFeedback,
};
