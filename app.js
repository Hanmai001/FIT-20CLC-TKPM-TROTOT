import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import activate_route from "./src/routes";
import activate_hbs from "./src/middleware/handlebars.mdw";
import hbs from 'hbs';
dotenv.config();

const app = express();

// app.use(morgan("combined"));
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
