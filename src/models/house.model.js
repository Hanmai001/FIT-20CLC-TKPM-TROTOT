import db from "../config/db.config";

const addHouseModel = async (data) => {
    const { cities, district, wards, type_house, status, detailed_address, title, description, utilities, area, num_people, price, water, electricity } = data;
    const [id] = await db('tindangtro').insert(
        {
            Ten: title,
            DiaChi: detailed_address + ', ' + wards + ', ' + district + ', ' + cities,
            TrangThaiKiemDuyet: 1,
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

export { addHouseModel }