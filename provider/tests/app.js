import express from 'express';

const app = express();

app.get('/resources', (req, res) => {
  res.json({ id: 1, name: 'Resource 1', type: 'Type 1' });
});

export { app };
