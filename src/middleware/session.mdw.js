// import session from 'express-session';
// import fnKnexStore from 'connect-session-knex';

// import db from '../config/db.config';

// export default function (app) {
//   const KnexStore = fnKnexStore(session);
//   const store = new KnexStore({ knex: db });

//   app.set('trust proxy', 1) // trust first proxy
//   app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//       // secure: true
//     }
//   }))
// }