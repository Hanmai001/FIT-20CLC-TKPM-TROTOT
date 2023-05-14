import postRoute from './post';
import tenantRoute from './tenant';
import initDetailsRoute from './details_house';
import initListRoute from './list-houses';
import landlordRoute from './landlord';
import adminRoute from './admin.route';
import apiRoute from './api';
import authRoute from './authRoute';
import redirectRoute from './redirect.route'
import initGuestRoute from './guest.route'
import { isLoggedCustomer, isLoggedAdmin, isLoggedLandlord, isLogged } from '../controllers/auth.controller';


export default function (app) {
  app.use("/api", apiRoute);
  app.use("/account", authRoute);
  app.use("/redirect", redirectRoute);
  app.use("/tenant", tenantRoute);
  app.use("/guest", isLoggedCustomer, initGuestRoute);
  app.use("/landlord", isLoggedLandlord, landlordRoute);
  app.use("/house", postRoute);
  app.use("/admin", adminRoute);
  app.use("/details/:id", initDetailsRoute);
  app.use("/list", initListRoute);
  app.use("/", isLogged, (req, res, next) => {
    try {
      // console.log(req.session)
      res.render("home");
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