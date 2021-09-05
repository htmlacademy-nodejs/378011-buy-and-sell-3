'use strict';

const express = require(`express`);
const session = require(`express-session`);
const path = require(`path`);
const sequelize = require(`../service/lib/sequelize`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);
const mainRoutes = require(`./routes/main`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `./public`;
const UPLOAD_DIR = `upload`;

const {SESSION_SECRET} = process.env;
if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}


const app = express();

const mySessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 180000,
  checkExpirationInterval: 60000
});

sequelize.sync({force: false});

app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: `verysecretstring`,
  store: mySessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
}));

app.use(express.urlencoded({extended: false}))
.use(express.json());

app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use((req, res) => res.status(400).render(`errors/404`));
app.use((err, req, res) => res.status(500).render(`errors/500`));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);


app.listen(DEFAULT_PORT);
