import { getAllHousesOfLandlord, getLandlordHouseListModel, getAllHouseAppointmentLandlord, getLandlordHouseAppointmentListModel } from "../models/house.model";
import { findPhotosOfHouse } from "../models/photo.model";
import { getInfoProfile, updateProfileModel } from "../models/landlord.model";
import { getInfoProfileTenant } from "../models/tenant.model";
import { confirmAppointmenLandlord, cancelAppointmentModel } from "../models/appointment.model";

const getPostHousePage = async (req, res) => {
    res.render("vwLandlord/post-house")
}
const getHouseManagementPage = async (req, res) => {
    let { page, filter } = req.query;
    if (!page) page = 1;
    const { houses, pages } = await getAllHousesOfLandlord(1, filter);
    console.log(filter, page)
    const result = await getLandlordHouseListModel(1, 5, (page - 1) * 5, filter);
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
    return res.render("vwLandlord/house-management", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result })
}
const getManageAppointmentPage = async (req, res) => {
    let { page, filter } = req.query;
    if (!page) page = 1;
    const { houses, pages } = await getAllHouseAppointmentLandlord(1, filter);
    console.log(filter, page)
    const result = await getLandlordHouseAppointmentListModel(1, 5, (page - 1) * 5, filter);
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
        const user = await getInfoProfileTenant(house.NguoiDatHen);
        house.TenNguoiDatHen = user.HoTen;
        house.SDTNguoiDatHen = user.SDT;
    }
    return res.render("vwLandlord/manage-appointment", { page: page ? parseInt(page) : 1, pages: parseInt(pages), houses: result })
}
const getProfilePage = async (req, res) => {
    const idUser = 1;
    const user = await getInfoProfile(idUser);
    const date = new Date(user.NgaySinh);
    let time = date.toISOString().substring(0, 10);
    const newDate = new Date(time);
    newDate.setDate(newDate.getDate() + 1);
    const newDateStr = newDate.toISOString().slice(0, 10);
    user.NgaySinh = newDateStr;
    res.render("vwLandlord/landlord-profile", { idUser: 1, user })
}
const getChangePassPage = async (req, res) => {
    res.render("vwLandlord/change-password")
}
const updateProfile = async (req, res) => {
    const idUser = 1;
    let ava = '';
    console.log(req.body, req.file);
    if (req.file)
        ava = '../.' + req.file.destination + req.file.filename;
    await updateProfileModel(idUser, req.body, ava);
    res.redirect('/landlord/profile')
}
const confirmAppointment = async (req, res) => {
    const { id } = req.params;
    await confirmAppointmenLandlord(id);
    return res.redirect('/landlord/manage-appointment');
}
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    await cancelAppointmentModel(id);
    return res.redirect('/landlord/manage-appointment');
}
export {
    getPostHousePage,
    getHouseManagementPage,
    getManageAppointmentPage,
    getProfilePage,
    getChangePassPage,
    updateProfile,
    confirmAppointment,
    deleteAppointment
}