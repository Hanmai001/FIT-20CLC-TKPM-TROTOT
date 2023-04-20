import createError from "http-errors";
const checkTeacher = (req, res, next) => {
    try {
        if (req.session.authUser.permission === "Teacher"){
            next();
        }
        else {
            res.render('401');
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
}
const checkStudent = (req, res, next) => {
    try {
        if (req.session.authUser.permission === "Student"){
            next();
        }
        else {
            res.render('401');
        }    
    } catch (err){
        throw createError.InternalServerError(err.message);
    }
}
const checkAdmin = (req, res, next) => {
    try {
        if (req.session.authUser.permission === "Admin"){
            next();
        }
        else {
            res.render('401');
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
}
export { checkTeacher, checkAdmin, checkStudent};