import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import activate_hbs from "./src/middleware/handlebars.mdw";
import activate_route from "./src/routes";
import { passport } from "./src/middleware/passport.mdw";
import session from "express-session";
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

dotenv.config();

const app = express();
const corsOptions = { origin: "*" };


app.use(cors(corsOptions));
// Cấu hình session
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(logger('dev'));
app.use(cookieParser());

app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

activate_hbs(app);
activate_route(app);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
