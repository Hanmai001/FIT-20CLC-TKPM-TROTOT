import { response } from "express";
import db from "../config/db.config";

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
const getAllHousesOfLandlord = async (idUser) => {
    const res = await db('tindangtro').select('*');
    return { houses: res, pages: Math.ceil(res.length / 5) };
}
const getLandlordHouseListModel = async (idUser, limit, offset) => {
    const result = await db('tindangtro')
        .select('*')
        .limit(limit)
        .offset(offset);
    return result;
}

export { addHouseModel, getAllHousesOfLandlord, getLandlordHouseListModel }