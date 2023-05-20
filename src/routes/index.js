import postRoute from './post';
import tenantRoute from './tenant';
import landlordRoute from './landlord';
import adminRoute from './admin.route';
import apiRoute from './api';
import authRoute from './authRoute';
import { isLoggedCustomer, isLoggedAdmin, isLoggedLandlord, isLogged, logout } from '../controllers/auth.controller';
import { getAllPostInfo, sortPosts } from '../models/post.model';


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
      let { page, sort, type, status, area, price } = req.query;
      if (!page) page = 1;
      const { post } = await getAllPostInfo(sort, type, status, area, price);
      //console.log(post)
      const perPage = 5;
      const startIdx = (page - 1) * perPage;
      const paginatedPosts = post.slice(startIdx, startIdx + perPage);

      for (let house of paginatedPosts) {
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

        house.Hinhanh = house.Hinhanh.slice(3);
      }
      // Render view
      res.render('home', {
        page: parseInt(page),
        pages: Math.ceil(post.length / perPage),
        post: paginatedPosts
      });
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