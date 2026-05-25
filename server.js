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
let databaseError = '';
let databaseConnectionPromise = null;

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

app.use(express.json({ limit: '8mb' }));

app.use('/api', (_request, response, next) => {
  response.set('Cache-Control', 'no-store');
  next();
});

connectDatabase();

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

function getDatabaseStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  return {
    connected: isDatabaseReady(),
    state: states[mongoose.connection.readyState] || 'unknown',
    hasUri: Boolean(process.env.MONGODB_URI),
    dbName: process.env.MONGODB_DB || 'portafolio',
    error: databaseError || null
  };
}

function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    databaseError = 'MONGODB_URI no está configurada en las variables de entorno.';
    console.warn(databaseError);
    return Promise.resolve(false);
  }

  if (isDatabaseReady()) {
    databaseError = '';
    return Promise.resolve(true);
  }

  if (databaseConnectionPromise) {
    return databaseConnectionPromise;
  }

  databaseError = 'Conectando con MongoDB Atlas...';
  databaseConnectionPromise = mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || 'portafolio',
      serverSelectionTimeoutMS: 10000
    })
    .then(() => {
      databaseError = '';
      console.log('MongoDB conectado.');
      return true;
    })
    .catch((error) => {
      databaseError = error.message;
      console.error('No se pudo conectar MongoDB:', error.message);
      return false;
    })
    .finally(() => {
      databaseConnectionPromise = null;
    });

  return databaseConnectionPromise;
}

async function requireDatabase(_request, response, next) {
  if (!isDatabaseReady()) {
    await connectDatabase();
  }

  if (!isDatabaseReady()) {
    response.status(503).json({
      message: 'La base de datos no está disponible.',
      database: getDatabaseStatus()
    });
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
    database: isDatabaseReady() ? 'connected' : 'unavailable',
    details: getDatabaseStatus()
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

  response.json({
    portfolio: document?.data || null,
    updatedAt: document?.updatedAt || null
  });
});

app.put('/api/portfolio', requireDatabase, requireEditorToken, async (request, response) => {
  try {
    if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
      response.status(400).json({ message: 'Contenido inválido.' });
      return;
    }

    const document = await Portfolio.findOneAndUpdate(
      { slug: portfolioSlug },
      { $set: { data: request.body } },
      { new: true, upsert: true }
    ).lean();

    response.json({
      portfolio: document.data,
      updatedAt: document.updatedAt
    });
  } catch (error) {
    console.error('Error guardando portafolio:', error.message);
    response.status(500).json({ message: 'MongoDB no pudo guardar los cambios.' });
  }
});

app.use((error, _request, response, next) => {
  if (error.type === 'entity.too.large') {
    response.status(413).json({ message: 'La imagen es demasiado pesada. Usa una foto más liviana.' });
    return;
  }

  next(error);
});

app.get('/', (_request, response, next) => {
  response.set('Cache-Control', 'no-store');
  next();
});

app.use(express.static('public', {
  etag: false,
  setHeaders(response) {
    response.set('Cache-Control', 'no-store');
  }
}));

app.listen(port, () => {
  console.log(`Portafolio listo en http://localhost:${port}`);
});
