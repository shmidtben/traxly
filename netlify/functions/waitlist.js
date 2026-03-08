exports.handler = async function (event) {
if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { type, name, email, genre, link, why } = body;

  if (!type || !name || !email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfiguration' }) };
  }

  const contact = {
    email,
    firstName: name.split(' ')[0],
    lastName: name.split(' ').slice(1).join(' ') || undefined,
    source: type === 'artist' ? 'artist-waitlist' : 'curator-application',
    userGroup: type === 'artist' ? 'artist' : 'curator',
  };

  if (type === 'curator') {
    if (genre) contact.genre = genre;
    if (link) contact.curatorLink = link;
    if (why) contact.curatorWhy = why;
  }

  // Remove undefined fields
  Object.keys(contact).forEach(k => contact[k] === undefined && delete contact[k]);

  const res = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Loops API error:', res.status, text);
    return { statusCode: 502, body: JSON.stringify({ error: 'Failed to save contact' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  };
};
