import db from "../config/db.config";
import { deletePhotoModel } from "./photo.model";
import { deleteVideoModel } from "./video.model";
import { deleteUtilityModel } from "./utility.model";

const addHouseModel = async (data) => {
    const { cities, districts, wards, type_house, status, detailed_address, title, description, utilities, area, num_people, price, water, electricity } = data;
    const [id] = await db('tindangtro').insert(
        {
            Ten: title,
            DiaChi: detailed_address + ', ' + wards + ', ' + districts + ', ' + cities,
            TrangThaiKiemDuyet: "Chờ xác nhận",
            Gia: price,
            MoTa: description,
            SoNguoi: parseInt(num_people),
            TrangThaiPhong: status,
            LoaiTro: type_house,
            DienTich: parseFloat(area),
            TienDien: parseFloat(electricity),
            TienNuoc: parseFloat(water)
        }, 'TinID').returning('TinID')
    return id;
}
const getAllHousesOfLandlord = async (idUser, filter) => {
    let result = db('tindangtro').select('*');
    if (filter) {
        if (filter === "Chờ xác nhận" || filter === "Đã duyệt")
            result = result.where('TrangThaiKiemDuyet', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDang', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDang', 'desc')
    }
    result = await result;
    return { houses: result, pages: Math.ceil(result.length / 5) };
}
const getLandlordHouseListModel = async (idUser, limit, offset, filter) => {
    let result = db('tindangtro')
        .select('*')
        .limit(limit)
        .offset(offset);
    if (filter) {
        if (filter === "Chờ xác nhận" || filter === "Đã duyệt")
            result = result.where('TrangThaiKiemDuyet', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDang', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDang', 'desc')
    }
    return await result;
}
const deleteLandlordHouseModel = async (idHouse) => {
    db('tindangtro')
        .where('TinID', '=', idHouse)
        .del()
        .then(function () {
            deletePhotoModel(idHouse);
            deleteVideoModel(idHouse);
            deleteUtilityModel(idHouse);
        })
}

export { addHouseModel, getAllHousesOfLandlord, getLandlordHouseListModel, deleteLandlordHouseModel }