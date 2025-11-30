const axios = require('axios');

const JUDGE0_URL = process.env.JUDGE0_API_URL;
const HEADERS = {};

if (process.env.JUDGE0_API_KEY) {
  // Example for RapidAPI or other hosts. Adjust as needed.
  HEADERS['X-RapidAPI-Key'] = process.env.JUDGE0_API_KEY;
  try {
    HEADERS['X-RapidAPI-Host'] = new URL(JUDGE0_URL).hostname;
  } catch (e) {}
}

async function submitToJudge0({ source_code, language_id, stdin = '' }) {
  // Create a submission (non-blocking), then poll
  const createResp = await axios.post(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
    source_code, language_id, stdin
  }, { headers: HEADERS });

  const token = createResp.data.token;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 700));
    const r = await axios.get(`${JUDGE0_URL}/submissions/${token}`, { headers: HEADERS });
    if (r.data.status && r.data.status.id > 2) return r.data;
  }
  return { status: { description: 'Timeout' } };
}

module.exports = { submitToJudge0 };
