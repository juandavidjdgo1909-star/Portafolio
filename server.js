import crypto from 'node:crypto';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const adminPassword = process.env.ADMIN_PASSWORD || '65771344';
const portfolioSlug = 'main';
const editTokens = new Set();

const portfolioSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

app.use(express.json({ limit: '1mb' }));

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI no está configurada. La API de portafolio responderá como no disponible.');
} else {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || 'portafolio',
      serverSelectionTimeoutMS: 10000
    })
    .then(() => {
      console.log('MongoDB conectado.');
    })
    .catch((error) => {
      console.error('No se pudo conectar MongoDB:', error.message);
    });
}

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

function requireDatabase(_request, response, next) {
  if (!isDatabaseReady()) {
    response.status(503).json({ message: 'La base de datos no está disponible.' });
    return;
  }

  next();
}

function requireEditorToken(request, response, next) {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token || !editTokens.has(token)) {
    response.status(401).json({ message: 'No autorizado.' });
    return;
  }

  next();
}

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    database: isDatabaseReady() ? 'connected' : 'unavailable'
  });
});

app.post('/api/login', (request, response) => {
  if (request.body?.password !== adminPassword) {
    response.status(401).json({ message: 'Contraseña incorrecta.' });
    return;
  }

  const token = crypto.randomBytes(32).toString('hex');
  editTokens.add(token);
  response.json({ token });
});

app.get('/api/portfolio', requireDatabase, async (_request, response) => {
  const document = await Portfolio.findOne({ slug: portfolioSlug }).lean();

  response.json({ portfolio: document?.data || null });
});

app.put('/api/portfolio', requireDatabase, requireEditorToken, async (request, response) => {
  if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
    response.status(400).json({ message: 'Contenido inválido.' });
    return;
  }

  const document = await Portfolio.findOneAndUpdate(
    { slug: portfolioSlug },
    { $set: { data: request.body } },
    { new: true, upsert: true }
  ).lean();

  response.json({ portfolio: document.data });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Portafolio listo en http://localhost:${port}`);
});
