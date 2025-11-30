const express = require('express');
const router = express.Router();
const { submitToJudge0 } = require('../services/judge0Service');

router.post('/run', async (req, res) => {
  try {
    const { source_code, language_id, stdin = '' } = req.body;
    if (!source_code || !language_id) return res.status(400).json({ error: 'Missing fields' });

    const result = await submitToJudge0({ source_code, language_id, stdin });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Execution error' });
  }
});

module.exports = router;
