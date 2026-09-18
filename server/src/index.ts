import express from 'express';
import cors from 'cors';
import { buildAnalytics, type AnalyticsQuery } from './analytics.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/analytics', (req, res) => {
  const period = (req.query.period as AnalyticsQuery['period']) || 'today';
  const year = Number(req.query.year) || new Date().getFullYear();
  const month = Number(req.query.month) || new Date().getMonth();

  const data = buildAnalytics({ period, year, month });
  res.json(data);
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
