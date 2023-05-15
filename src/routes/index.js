import postRoute from './post';
import tenantRoute from './tenant';
import landlordRoute from './landlord';
import adminRoute from './admin.route';
import apiRoute from './api';
import authRoute from './authRoute';
import { isLoggedCustomer, isLoggedAdmin, isLoggedLandlord, isLogged, logout } from '../controllers/auth.controller';
import { getAllPostInfo } from '../models/post.model';


export default function (app) {
  app.use("/api", apiRoute);
  app.use("/account", authRoute);
  app.use("/tenant", isLoggedCustomer, tenantRoute);
  app.use("/landlord", isLoggedLandlord, landlordRoute);
  app.use("/house", postRoute);
  app.use("/admin", adminRoute);
  app.use("/post", postRoute);
  app.use("/logout", logout);

  app.get('/', async (req, res, next) => {
    try {
      const post = await getAllPostInfo();
      res.render('home', { post: post });
    } catch (err) {
      next(err);
    }
  });

  app.use(function (req, res, next) {
    res.render("404", { layout: false });
  });

  app.use(function (err, req, res, next) {
    res.status(500).render("500", {
      stack: err.stack,
      layout: false,
    });
  });
}