import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import config from './config.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('welcome to server =))');
});

app.use('/api/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}`);
});

/*

import rateLimit from 'express-rate-limit';
import router from './routes.js';
import { errorHandler, logger } from './middleware.js';

const PORT = process.env.PORT || 5000;


app.use(logger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/', router);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${ PORT }`);
});
*/
