import db from "../config/db.config";

const addHouseModel = async (idUser, data) => {
    const { cities, districts, wards, type_house, status, detailed_address, title, description, utilities, area, num_people, price, water, electricity } = data;
    const [id] = await db('tindangtro').insert(
        {
            Ten: title,
            DiaChi: detailed_address + ', ' + wards + ', ' + districts + ', ' + cities,
            TrangThaiKiemDuyet: "Chờ xác nhận",
            Gia: price,
            MoTa: description,
            SoNguoi: parseInt(num_people),
            NguoiDangTin: parseInt(idUser),
            TrangThaiPhong: status,
            LoaiTro: type_house,
            DienTich: parseFloat(area),
            TienDien: parseFloat(electricity),
            TienNuoc: parseFloat(water)
        }, 'TinID').returning('TinID')
    return id;
}
const updateHouseModel = async (data, idHouse) => {
    const { cities, districts, wards, type_house, status, detailed_address, title, description, utilities, area, num_people, price, water, electricity } = data;
    const [id] = await db('tindangtro').where('TinID', '=', idHouse).update(
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
const getAllHouseAppointmentLandlord = async (idUser, filter) => {
    let result = db('dondathen').select('*').where('ChuTro', '=', idUser);
    if (filter) {
        if (filter === "Chưa xác nhận" || filter === "Đã xác nhận" || filter === "Đã hủy")
            result = result.where('TrangThaiLichHen', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDatHen', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDatHen', 'desc')
    }
    result = await result;
    return { houses: result, pages: Math.ceil(result.length / 5) };
}
const getLandlordHouseAppointmentListModel = async (idUser, limit, offset, filter) => {
    let result = db('dondathen')
        .join('tindangtro', 'dondathen.TinID', '=', 'tindangtro.TinID')
        .where('ChuTro', '=', idUser)
        .select('*')
        .limit(limit)
        .offset(offset);
    if (filter) {
        if (filter === "Chưa xác nhận" || filter === "Đã xác nhận" || filter === "Đã hủy")
            result = result.where('TrangThaiLichHen', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDatHen', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDatHen', 'desc')
    }
    return await result;
}
const getAllHousesOfLandlord = async (idUser, filter) => {
    let result = db('tindangtro').where('NguoiDangTin', '=', idUser).select('*');
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
        .where('NguoiDangTin', '=', idUser)
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
    await db('tindangtro')
        .where('TinID', '=', idHouse)
        .del();
}
const getDetailedHouseModel = async (idHouse) => {
    const res = await db('tindangtro').select('*').where('TinID', '=', idHouse);
    return res[0];
}

const getAllHouseAppointmentTenant = async (idUser, filter) => {
    let result = db('dondathen').select('*').where('NguoiDatHen', '=', idUser);
    if (filter) {
        if (filter === "Chưa xác nhận" || filter === "Đã xác nhận" || filter === "Đã hủy")
            result = result.where('TrangThaiLichHen', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDatHen', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDatHen', 'desc')
    }
    result = await result;
    return { houses: result, pages: Math.ceil(result.length / 5) };
}
const getTenantHouseAppointmentListModel = async (idUser, limit, offset, filter) => {
    let result = db('dondathen')
        .join('tindangtro', 'dondathen.TinID', '=', 'tindangtro.TinID')
        .where('NguoiDatHen', '=', idUser)
        .select('*')
        .limit(limit)
        .offset(offset);
    if (filter) {
        if (filter === "Chưa xác nhận" || filter === "Đã xác nhận" || filter === "Đã hủy")
            result = result.where('TrangThaiLichHen', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDatHen', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDatHen', 'desc')
    }
    return await result;
}
export {
    addHouseModel,
    getAllHousesOfLandlord,
    getLandlordHouseListModel,
    deleteLandlordHouseModel,
    getAllHouseAppointmentLandlord,
    getLandlordHouseAppointmentListModel,
    getDetailedHouseModel,
    updateHouseModel,
    getAllHouseAppointmentTenant,
    getTenantHouseAppointmentListModel
}