import dotenv from "dotenv";
import express from "express";
// import morgan from "morgan";
import activate_hbs from "./src/middleware/handlebars.mdw";
import activate_route from "./src/routes";
// import hbs from 'hbs';
import { passport } from "./src/middleware/passport.mdw"
import cookieParser from "cookie-parser";
import logger from 'morgan';
import flash from 'connect-flash';
import session from "express-session";

dotenv.config();

const app = express();
// Cấu hình session
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
