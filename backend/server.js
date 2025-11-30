require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const winston = require('winston');
const path = require('path');

const LOG_DIR = process.env.LOG_DIR || 'C:\\logs\\codemist';
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: path.join(LOG_DIR, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(LOG_DIR, 'combined.log') }),
    new winston.transports.Console()
  ]
});

const app = express();
app.use(helmet());
app.use(express.json({ limit: '250kb' }));

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: function(origin, cb){
    if (!origin) return cb(null, true); // allow curl/postman
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) return cb(null, true);
    cb(new Error('CORS_DENIED'));
  },
  credentials: true
}));

// Rate limiter
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

// morgan to file
const accessLogStream = fs.createWriteStream(path.join(LOG_DIR, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.use('/api/snippets', require('./src/routes/snippets'));
app.use('/api/runner', require('./src/routes/runner'));

// health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// start server after DB connect
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('MongoDB connected');
    const server = app.listen(PORT, () => logger.info(`Server listening on ${PORT}`));
    const shutdown = () => {
      logger.info('Shutting down...');
      server.close(() => {
        mongoose.connection.close(false, () => process.exit(0));
      });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  })
  .catch(err => {
    logger.error('MongoDB connection failed', err);
    process.exit(1);
  });
