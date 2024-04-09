import express from 'express';
import { bands } from './data';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/bands', (_, res) => {
  res.send(bands);
});

app.get('/bands/:id', (req, res) => {
  const id = Number(req.params.id);
  const band = bands.find((b) => b.id === id);
  if (band) {
    res.send(band);
  } else {
    res.status(404).send({ message: 'Band not found' });
  }
});

app.listen(port, host, () => {``
  console.log(`[ ready ] http://${host}:${port}`);
});
