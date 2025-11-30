const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// create
router.post('/', async (req, res) => {
  try {
    const { title = 'untitled', language, code } = req.body;
    const s = new Snippet({ title, language, code });
    await s.save();
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list
router.get('/', async (req, res) => {
  try {
    const list = await Snippet.find().sort({ createdAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get by id
router.get('/:id', async (req, res) => {
  try {
    const s = await Snippet.findById(req.params.id);
    if (!s) return res.status(404).json({ error: 'Not found' });
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
