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


const findAll = async (filter) => {
    let result = await db('tindangtro');
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

const findByPage = async (limit, offset, filter) => {
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
const getIDLandlordOfAHouseModel = async (idHouse) => {
    const res = await db('tindangtro').where('TinID', '=', idHouse).select('NguoiDangTin');
    return res[0];
}
const getPostInfo = async (postID) => {
    const post = await db('tindangtro').where('TinID', '=', postID).select('*');

    return post[0];
}
const getAllPostInfo = async () => {
    const post = await db('tindangtro as post')
        .select('post.TinID', 'post.Ten', 'post.DiaChi', 'post.DienTich', 'post.Gia', 'post.NgayDang')
        .select(db.raw('SUBSTRING_INDEX(GROUP_CONCAT(hinh_anh.ChiTietHinhAnh SEPARATOR ","), ",", 1) as Hinhanh'))
        .innerJoin('hinhanh_tindangtro as hinhanh_tindangtro', 'post.TinID', 'hinhanh_tindangtro.TinID')
        .innerJoin('hinh_anh', 'hinhanh_tindangtro.HinhAnhID', 'hinh_anh.HinhAnhID')
        .groupBy('post.TinID', 'post.Ten', 'post.DiaChi', 'post.DienTich', 'post.Gia', 'post.NgayDang');

    return post;

}
const getAuthorInfo = async (postID) => {
    const author = await db('nguoidung')
        .join('tindangtro', 'nguoidung.NguoiDungID', '=', 'tindangtro.NguoiDangTin')
        .where('tindangtro.TinID', '=', postID)
        .select('*');
    return author[0];
}
const getutilitiesInfo = async (postID) => {
    const tienich = await db('tien_ich')
        .innerJoin('tienich_tindangtro', 'tien_ich.TienIchID', '=', 'tienich_tindangtro.TienIchID')
        .where('tienich_tindangtro.TinID', '=', postID)
        .select('*');
    return tienich;
}
const getReviewInfo = async (postID) => {
    const review = await db('danhgia')
        .join('nguoidung', 'nguoidung.NguoiDungID', '=', 'danhgia.NguoiDanhGia')
        .where('danhgia.TinID', '=', postID)
        .select('*');

    return review;
}
const getImageInfo = async (postID) => {
    const image = await db.select('*')
        .from('hinh_anh')
        .join('hinhanh_tindangtro', 'hinh_anh.HinhAnhID', '=', 'hinhanh_tindangtro.HinhAnhID')
        .where('hinhanh_tindangtro.TinID', '=', postID);
    return image;
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
    getTenantHouseAppointmentListModel,
    getIDLandlordOfAHouseModel,
    getPostInfo,
    getAuthorInfo,
    getReviewInfo,
    getutilitiesInfo,
    getImageInfo,
    getAllPostInfo,
    findAll, findByPage
}