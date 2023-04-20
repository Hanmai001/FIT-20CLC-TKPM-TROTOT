import session from "express-session";
import dotenv from 'dotenv'
dotenv.config()
import mongoDBStore from 'connect-mongodb-session'


const mongoStore = mongoDBStore(session);

var store = new mongoStore({
  uri: process.env.URI_MONGODB,
  collection: 'mySessions',
  expires: 1000 * 60 * 60 * 24,
});

export default function (app) {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: {
        // secure: true
      },
    })
  );
}
