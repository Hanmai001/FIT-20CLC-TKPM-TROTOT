import {
    getAllHouseAppointmentTenant,
    getTenantHouseAppointmentListModel,
    getIDLandlordOfAHouseModel
} from "../models/post.model";
import { getFavouriteListOfTenant, getFavouriteListPageModel } from "../models/favourite_list.model";
import { findPhotosOfHouse } from "../models/photo.model";
import { getInfoProfileTenant, updateProfileTenantModel, getInfoProfileLandlord } from "../models/user.model";
import { addAppointmentModel, cancelAppointmentModel } from "../models/appointment.model";
import { addingReport } from "../models/report.model";
const getTenantPage = async (req, res) => {
    return res.render("vwTenant/tenant-profile")
}
const getManageAppointmentPage = async (req, res) => {
    let { page, filter } = req.query;
    const idUser = res.locals.user.id;
    if (!page) page = 1;
    const { houses, pages } = await getAllHouseAppointmentTenant(idUser, filter);

    const result = await getTenantHouseAppointmentListModel(idUser, 5, (page - 1) * 5, filter);
    console.log(filter, page, result)
    for (let house of result) {
        const temp = await findPhotosOfHouse(house.TinID);
        house.photo = temp[0].ChiTietHinhAnh;
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
        const user = await getInfoProfileLandlord(house.ChuTro);
        house.TenChuTro = user.TaiKhoan;
        house.SDTChuTro = user.SDT;
    }
    return res.render("vwTenant/manage-appointment", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result })
}
const getProfilePage = async (req, res) => {
    const idUser = res.locals.user.id;
    const user = await getInfoProfileTenant(idUser);
    const date = new Date(user.NgaySinh);
    let time = date.toISOString().substring(0, 10);
    const newDate = new Date(time);
    newDate.setDate(newDate.getDate() + 1);
    const newDateStr = newDate.toISOString().slice(0, 10);
    user.NgaySinh = newDateStr;
    res.render("vwTenant/tenant-profile", { idUser, user })
}
const getChangePassPage = async (req, res) => {
    res.render("vwTenant/change-password")
}
const updateProfile = async (req, res) => {
    const idUser = res.locals.user.id;
    let ava = '';
    console.log(req.body, req.file);
    if (req.file)
        ava = '../.' + req.file.destination + req.file.filename;
    await updateProfileTenantModel(idUser, req.body, ava);
    res.redirect('/tenant/profile')
}
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    await cancelAppointmentModel(id);
    return res.redirect('/tenant/manage-appointment');
}
const addAppointment = async (req, res) => {
    const idUser = res.locals.user.id;
    console.log(req.body)
    const idHouse = req.params.id;
    console.log(idHouse)
    const idLandlord = await getIDLandlordOfAHouseModel(idHouse);
    await addAppointmentModel(idUser, idLandlord, req.body);

    res.redirect('/tenant/manage-appointment');
}
const addReport = async (req, res) => {
    const idUser = res.locals.user.id;
    console.log(idUser)
    const idPost = req.params.id;
    await addingReport(idUser, idPost, req.body);

    res.redirect('/post/details/' + idPost);
}

const getFavouriteListPage = async (req, res) => {
    let { page, filter } = req.query;
    const idUser = res.locals.user.id;
    if (!page) page = 1;
    const { houses, pages } = await getFavouriteListOfTenant(idUser, filter);
    //console.log(filter, page)
    const result = await getFavouriteListPageModel(idUser, 5, (page - 1) * 5, filter);
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
    }
    return res.render("vwTenant/favourite-list", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result })
}
export {
    getManageAppointmentPage,
    getProfilePage,
    getChangePassPage,
    updateProfile,
    getTenantPage,
    deleteAppointment,
    addAppointment,
    getFavouriteListPage,
    addReport
}
