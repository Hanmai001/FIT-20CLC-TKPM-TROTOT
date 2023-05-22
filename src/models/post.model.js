import db from "../config/db.config";

const addHouseModel = async (idUser, data) => {
    const { cities, districts, wards, type_house, status, detailed_address, title, description, utilities, area, num_people, price, water, electricity } = data;
    const [id] = await db('tindangtro').insert(
        {
            Ten: title,
            DiaChi: detailed_address + ', ' + wards + ', ' + districts + ', ' + cities,
            TrangThaiKiemDuyet: data.TrangThaiKiemDuyet || "Chờ xác nhận",
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
const updateHouseModel = async (idHouse, data) => {
    const { cities, districts, wards, type_house, status, detailed_address, title, description, utilities, area, num_people, price, water, electricity } = data;

    await db('tindangtro').where('TinID', '=', idHouse).update(
        {
            Ten: title,
            DiaChi: detailed_address + ', ' + wards + ', ' + districts + ', ' + cities,
            TrangThaiKiemDuyet: data.TrangThaiKiemDuyet || "Chờ xác nhận",
            Gia: price,
            MoTa: description,
            SoNguoi: parseInt(num_people),
            TrangThaiPhong: status,
            LoaiTro: type_house,
            DienTich: parseFloat(area),
            TienDien: parseFloat(electricity),
            TienNuoc: parseFloat(water)
        }, 'TinID').returning('TinID')
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
        if (filter === "Chờ xác nhận" || filter === "Đã duyệt" || filter === "Bị từ chối")
            result = result.where('TrangThaiKiemDuyet', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDang', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDang', 'desc')
    }
    result = await result;
    return { houses: result, pages: Math.ceil(result.length / 5) };
}

const findAllPostsID = async () => {
    return await db('tindangtro').select('TinID', 'Ten');
}

const findAll = async (filter) => {
    let result = db('tindangtro').select('*');

    if (filter) {
        if (filter === "Chờ xác nhận" || filter === "Đã duyệt" || filter === "Bị từ chối")
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
        if (filter === "Chờ xác nhận" || filter === "Đã duyệt" || filter === "Bị từ chối")
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
        if (filter === "Chờ xác nhận" || filter === "Đã duyệt" || filter === "Bị từ chối")
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
    return res[0].NguoiDangTin;
}
const getPostInfo = async (postID) => {
    const post = await db('tindangtro').where('TinID', '=', postID).select('*');

    return post[0];
}
const getAllPostInfo = async (sort, type, status, area, price) => {
    let post = [];

    const query = db('tindangtro as post')
        .select('post.TinID', 'post.Ten', 'post.TrangThaiKiemDuyet', 'post.DiaChi', 'post.DienTich', 'post.Gia', 'post.NgayDang', 'nguoidung.HoTen', 'nguoidung.SDT', 'post.SoNguoi', 'post.LoaiTro')
        .select(db.raw('SUBSTRING_INDEX(GROUP_CONCAT(hinh_anh.ChiTietHinhAnh SEPARATOR ","), ",", 1) as Hinhanh'))
        .innerJoin('hinhanh_tindangtro as hinhanh_tindangtro', 'post.TinID', 'hinhanh_tindangtro.TinID')
        .innerJoin('hinh_anh', 'hinhanh_tindangtro.HinhAnhID', 'hinh_anh.HinhAnhID')
        .innerJoin('nguoidung', 'post.NguoiDangTin', 'nguoidung.NguoiDungID')
        .where('post.TrangThaiKiemDuyet', '=', 'Đã duyệt')
        .groupBy('post.TinID', 'post.Ten', 'post.DiaChi', 'post.DienTich', 'post.Gia', 'post.NgayDang', 'nguoidung.HoTen', 'nguoidung.SDT');
    if (sort === 'price-down') {
        query.orderBy('post.Gia', 'desc');
    } else if (sort === 'price-up') {
        query.orderBy('post.Gia', 'asc');
    } else if (sort === 'newest') {
        query.orderBy('post.NgayDang', 'desc');
    }

    if (type) {
        query.where('post.LoaiTro', type);
    }

    if (status) {
        query.where('post.TrangThaiPhong', status);
    }

    if (area) {
        if (area === '20-40') {
            query.whereBetween('post.DienTich', [20, 40]);
        } else if (area === '40-60') {
            query.whereBetween('post.DienTich', [40, 60]);
        } else if (area === '60-100') {
            query.whereBetween('post.DienTich', [60, 100]);
        }
    }
    if (price) {
        if (price === '2000000-4000000') {
            query.whereBetween('post.Gia', [2000000, 4000000]);
        } else if (price === '4000000-6000000') {
            query.whereBetween('post.Gia', [4000000, 6000000]);
        } else if (price === '6000000-10000000') {
            query.whereBetween('post.Gia', [6000000, 10000000]);
        } else if (price === '>10000000') {
            query.where('post.Gia', '>', 10000000);
        }

    }
    post = await query;

    const pages = Math.ceil(post.length / 5);
    return { post, pages };
}

const getRelatePostInfo = async () => {
    const post = await db('tindangtro as post')
        .select('post.TinID', 'post.Ten', 'post.DiaChi', 'post.DienTich', 'post.Gia', 'post.NgayDang', 'nguoidung.HoTen', 'nguoidung.SDT', 'post.SoNguoi', 'post.LoaiTro')
        .select(db.raw('SUBSTRING_INDEX(GROUP_CONCAT(hinh_anh.ChiTietHinhAnh SEPARATOR ","), ",", 1) as Hinhanh'))
        .innerJoin('hinhanh_tindangtro as hinhanh_tindangtro', 'post.TinID', 'hinhanh_tindangtro.TinID')
        .innerJoin('hinh_anh', 'hinhanh_tindangtro.HinhAnhID', 'hinh_anh.HinhAnhID')
        .innerJoin('nguoidung', 'post.NguoiDangTin', 'nguoidung.NguoiDungID')
        .groupBy('post.TinID', 'post.Ten', 'post.DiaChi', 'post.DienTich', 'post.Gia', 'post.NgayDang', 'nguoidung.HoTen', 'nguoidung.SDT')
        .orderByRaw('RAND()');
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
const performFullTextSearch = async (keyword, sort, type, status, area, price) => {
    let query = db('tindangtro')
        .select('*')
        .join('hinhanh_tindangtro', 'hinhanh_tindangtro.TinID', '=', 'tindangtro.TinID')
        .join('hinh_anh', 'hinh_anh.HinhAnhID', '=', 'hinhanh_tindangtro.HinhAnhID')
        .whereRaw(`MATCH(Ten) AGAINST(? IN BOOLEAN MODE)`, [keyword])
        .where('tindangtro.TrangThaiKiemDuyet', '=', 'Đã duyệt')
        .groupBy('tindangtro.TinID');

    if (sort) {
        if (sort === 'price-down') {
            query.orderBy('Gia', 'desc');
        } else if (sort === 'price-up') {
            query.orderBy('Gia', 'asc');
        } else if (sort === 'newest') {
            query.orderBy('NgayDang', 'desc');
        }
    }
    if (type) {
        query = query.where('LoaiTro', type);
    }

    if (status) {
        query = query.where('TrangThaiPhong', status);
    }

    if (area) {
        const [minArea, maxArea] = area.split('-');
        query = query.whereBetween('DienTich', [minArea, maxArea]);
    }

    if (price) {
        if (price === '>10000000') {
            query = query.where('Gia', '>', 10000000);
        } else {
            const [minPrice, maxPrice] = price.split('-');
            query = query.whereBetween('Gia', [minPrice, maxPrice]);
        }
    }

    const results = await query;
    return { results: results, pages: Math.ceil(results.length / 8) };
};
//sorting
const sortPosts = async (posts, sortBy, sortOrder) => {
    if (sortBy === 'price') {
        posts.sort((a, b) => {
            if (sortOrder === 'up') {
                return a.Gia - b.Gia;
            } else {
                return b.Gia - a.Gia;
            }
        });
    } else if (sortBy === 'area') {
        posts.sort((a, b) => {
            if (sortOrder === 'up') {
                return a.DienTich - b.DienTich;
            } else {
                return b.DienTich - a.DienTich;
            }
        });
    } else if (sortBy === 'date') {
        posts.sort((a, b) => {
            if (sortOrder === 'up') {
                return new Date(a.NgayDang) - new Date(b.NgayDang);
            } else {
                return new Date(b.NgayDang) - new Date(a.NgayDang);
            }
        });
    }
}

const findPostByID = async (id) => {
    return await db('tindangtro').where('TinID', id);
}

const deletePostByID = async (id) => {
    await db('tindangtro').where('TinID', id).del();
}
//
export {
    deletePostByID,
    findPostByID,
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
    findAll, findByPage,
    performFullTextSearch,
    getRelatePostInfo,
    sortPosts,
    findAllPostsID,
}