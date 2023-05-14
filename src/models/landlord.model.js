import db from "../config/db.config";

const getInfoProfileLandlord = async (idUser) => {
    const res = await db('nguoidung').where('NguoiDungID', '=', idUser).select('HoTen', 'DiaChi', 'SDT', 'GioiTinh', 'NgaySinh', 'Email', 'GioiThieu', 'TaiKhoan', 'avatar');
    return res[0];
}
const updateProfileLandlordModel = async (idUser, data, file) => {
    //console.log(file)
    if (file) {
        const res = await db('nguoidung').where('NguoiDungID', '=', idUser).update({
            HoTen: data.updateFullname,
            DiaChi: data.cities,
            SDT: data.updatePhone,
            GioiTinh: data.updateSex,
            GioiThieu: data.updateIntro,
            avatar: file
        })
    }
    else {
        const res = await db('nguoidung').where('NguoiDungID', '=', idUser).update({
            HoTen: data.updateFullname,
            DiaChi: data.cities,
            SDT: data.updatePhone,
            GioiTinh: data.updateSex,
            GioiThieu: data.updateIntro,
        })
    }
    
}
export { getInfoProfileLandlord, updateProfileLandlordModel };