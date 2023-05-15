import postRoute from './post';
import tenantRoute from './tenant';
import landlordRoute from './landlord';
import adminRoute from './admin.route';
import apiRoute from './api';
import authRoute from './authRoute';
import { isLoggedCustomer, isLoggedAdmin, isLoggedLandlord, isLogged, logout } from '../controllers/auth.controller';
import { getAllPostInfo } from '../models/post.model';
import Layer from 'express/lib/router/layer';


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
      console.log(post)
      for (let house of post) {
        let date = new Date(house.NgayDatHen);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let vietnameseDate = date.toLocaleDateString('vi-VN', options);
        let vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayDatHen = vietnameseDate + ' ' + vietnameseTime;
        date = new Date(house.NgayGap);
        vietnameseDate = date.toLocaleDateString('vi-VN', options);
        vietnameseTime = date.toLocaleTimeString('vi-VN');
        house.NgayGap = vietnameseDate + ' ' + vietnameseTime;
        let str = house.Gia.toString();
        let result = '';
        while (str.length > 3) {
          result = '.' + str.slice(-3) + result;
          str = str.slice(0, -3);
        }
        result = str + result;
        house.Gia = result;
        house.Hinhanh = house.Hinhanh.slice(3)
      }
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