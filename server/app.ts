import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import mongosanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

import routers from './routes/index';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_HOST,
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(mongosanitize());

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'dvelopment') {
  app.use(morgan('dev'));
}

app.use(
  session({
    secret: 'keyboard cat',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: Date.now() + 1000 * 60 * 60,   // 1 hour
      sameSite: true
    }
  })
)

app.use(routers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

module.exports = app;