import userModel from '../models/user.model';
import bcrypt from "bcryptjs";
import {
    getDetailedHouseModel,
    findAll, findByPage,
    updateHouseModel,
    addHouseModel, 
} from "../models/post.model";
import { addPhotoModel, deletePhotoModel, findPhotoOfHouse, deletePhotosByArrayModel, findPhotosOfHouse } from "../models/photo.model";
import { addUtilityHouseModel, deleteUtilityModel, findUtilitiesOfHouse, findUtilityOfHouse, deleteOneUtilityModel } from "../models/utility.model";
import { addVideoModel, deleteVideoModel, findVideoOfHouse, deleteVideosByArrayModel, findVideosOfHouse } from "../models/video.model";

const getDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("/");
}
const getAllUsers = async (req, res, next) => {
    try {
        if (req.query.id && req.query.block) {
            const {id, block} = req.query;
            
            if (block === "true") await userModel.block(id);
            else await userModel.unblock(id);
            
            res.redirect('/admin/users');
        } else if (req.query.role) {
            const role = req.query.role;
            
            const users = await userModel.findByRole(role);
            res.render('vwAdmin/user', {
                users
            })
        } else {
            const users = await userModel.findAll();
            res.render('vwAdmin/user', {
                users
            })
        }
    } catch(err) {
        next(err);
    }
}
const getAllUsersID = async (req, res, next) => {
    try {
        const users = await userModel.findAllUserID();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
const getDetailedUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);

        user.NgaySinh = getDate(user.NgaySinh);
        res.render('vwAdmin/update_user', {
            user
        })
    } catch(err) {
        next(err);
    }
}
const updateUser = async (req, res, next) => {
    try {   
        const user = req.body;
        user.id = req.params.id;
        
        await userModel.patch(user);

        res.redirect('/admin/users');
    } catch (err) {
        next(err);
    }
}
const updateProfile = async (req, res, next) => {
    try {   
        const user = req.body;
        user.id = "1";

        await userModel.patchProfile(user);

        res.redirect('/admin/profile');
    } catch (err) {
        next(err);
    }
}
const updateUserPassword = async (req, res, next) => {
    try {   
        const user = req.body;
        user.id = req.params.id;

        await userModel.patchPassword(user);

        res.redirect('/admin/profile');
    } catch (err) {
        next(err);
    }
}
const countUserByRole = async (req, res, next) => {
    try { 
        return userModel.countByRole(req.query.role);
    } catch (err) {
        next(err);
    }
}
const getNewUser = async (req, res, next) => {
    try { 
        res.render('vwAdmin/add_user');
    } catch (err) {
        next(err);
    }
}
const addUser = async (req, res, next) => {
    try { 
        await userModel.add(req.body);

        res.redirect('back');
    } catch (err) {
        next(err);
    }
}
const checkUsername = async (req, res, next) => {
    try { 
        const list = await userModel.findUsername(req.query.username);

        if (list.length > 0) {
            return true; 
        }
        return false;
    } catch (err) {
        next(err);
    }
}
const getInfoProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById("1");
        user.NgaySinh = getDate(user.NgaySinh);

        res.render('vwAdmin/profile', {user});
    } catch (err) {
        next(err);
    }
}
const getAllPosts = async (req, res, next) => {
    try {
        let { page, filter } = req.query;
        if (!page) page = 1;

        const { pages } = await findAll(filter);
        
        const result = await findByPage(5, (page - 1) * 5, filter);

        for (let house of result) {
            const temp = await findPhotosOfHouse(house.TinID);
            house.photo = temp[0].ChiTietHinhAnh;
            const date = new Date(house.NgayDang);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const vietnameseDate = date.toLocaleDateString('vi-VN', options);
            const vietnameseTime = date.toLocaleTimeString('vi-VN');
            house.NgayDang = vietnameseDate + ' ' + vietnameseTime;
            let str = house.Gia.toString();
            let result = '';
            while (str.length > 3) {
                result = '.' + str.slice(-3) + result;
                str = str.slice(0, -3);
            }
            result = str + result;
            house.Gia = result;
            house.NguoiDangTin = await userModel.findById(house.NguoiDangTin);
        }

        return res.render("vwAdmin/post", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result });
    } catch (err) {
        next(err);
    }
}
const getPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const house = await getDetailedHouseModel(id);
        let photos = await findPhotosOfHouse(id);
        let videos = await findVideosOfHouse(id);
        let utilities = await findUtilitiesOfHouse(id);
        house.DiaChi = house.DiaChi.split(', ');
        house.ThanhPho = house.DiaChi[3];
        house.Quan = house.DiaChi[2];
        house.Phuong = house.DiaChi[1];
        house.DiaChiCuThe = house.DiaChi[0];
        utilities = utilities.map(item => item.TienIchID);
        house.NguoiDangTin = await userModel.findById(house.NguoiDangTin);
        
        res.render("vwAdmin/update_post", { house, photos: JSON.stringify(photos), utilities, videos: JSON.stringify(videos) });
    } catch (err) {
        next(err);
    }
}
const updatePost = async (req, res, next) => {
    try {
        let { utilities, deletedPhotos, deletedVideos } = req.body;
        const id = req.params.id;
        for (let file of req.files) {
            if (file.mimetype.startsWith('video/')) {
                if (!await findVideoOfHouse('../.' + file.destination + file.filename))
                    await addVideoModel(file.destination, file.filename, id);
            }
            else {
                if (!await findPhotoOfHouse('../.' + file.destination + file.filename))
                    await addPhotoModel(file.destination, file.filename, id);
            }

        }
        if (deletedPhotos) {
            if (typeof deletedPhotos === 'string')
                deletedPhotos = [deletedPhotos]
            await deletePhotosByArrayModel(id, deletedPhotos);

        }
        if (deletedVideos) {
            if (typeof deletedVideos === 'string')
                deletedVideos = [deletedVideos]
            await deleteVideosByArrayModel(id, deletedVideos);
        }
        let deletedUtilities = [];
        let oldUtilities = await findUtilitiesOfHouse(id);
        oldUtilities = oldUtilities.map(item => {
            if (!utilities.includes('' + item.TienIchID))
                deletedUtilities.push(item.TienIchID);
            return '' + item.TienIchID;
        });
        for (let x of deletedUtilities) {
            await deleteOneUtilityModel(id, x);
        }
        for (let utility of utilities) {
            if (!await findUtilityOfHouse(id, parseInt(utility)))
                await addUtilityHouseModel(utility, id);
        }
        updateHouseModel(id, req.body);

        res.redirect('/admin/posts');
    } catch (err) {
        next(err);
    }
}
const getNewPost = async (req, res, next) => {
    try {
        res.render("vwAdmin/add_post")
    } catch (err) {
        next(err);
    }
}

const addPost = async (req, res, next) => {
    try {
        console.log(req.body);
        const { utilities } = req.body;
        const id = await addHouseModel(req.body.NguoiDangTin, req.body);
        for (let file of req.files) {
            if (file.mimetype.startsWith('video/')) {
                await addVideoModel(file.destination, file.filename, id);
            }
            else {
                await addPhotoModel(file.destination, file.filename, id);
            }
        }

        for (let utility of utilities) {
            await addUtilityHouseModel(utility, id);
        }

        res.redirect("/admin/posts")
    } catch (err) {
        next(err);
    }
}


export {    getAllUsers, getDetailedUser, updateUser, 
            countUserByRole, getNewUser, addUser, checkUsername,
            getInfoProfile, updateProfile, updateUserPassword, getAllPosts,   
            getPost, updatePost, getNewPost, addPost, getAllUsersID
}