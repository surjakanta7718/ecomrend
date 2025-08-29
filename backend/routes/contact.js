const router = require('express').Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' });
  const doc = await new Contact({ name, email, message }).save();
  res.json({ ok: true, id: doc._id });
});

module.exports = router;
