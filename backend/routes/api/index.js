// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const tastingNotesRouter = require('./tastingNotes.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/tastingNotes', tastingNotesRouter);
router.use('/users', usersRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
router.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message, errors: err.errors });
});

module.exports = router;
