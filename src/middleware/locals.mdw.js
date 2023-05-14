export default function (app) {
    app.use(async function (req, res, next) {
        if (typeof req.session.auth === 'undefined') {
            req.session.auth = false;
        }

        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;
        next();
    });
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });

    // app.use(async function (req, res, next) {
    //   res.locals.lcCategories = await categoryService.findAllWithDetails();
    //   next();
    // });
}