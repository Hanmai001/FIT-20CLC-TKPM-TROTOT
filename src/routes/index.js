import initHouseRoute from './house';
import initLandlordRoute from './landlord';

export default function (app) {
  app.use("/landlord", initLandlordRoute);
  app.use("/house", initHouseRoute);
  app.use("/", (req, res, next) => {
    res.render("home");
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