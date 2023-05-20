import db from "../config/db.config";

const confirmAppointmenLandlord = async (idAppointment) => {
    await db('dondathen').where('DdhID', idAppointment).update({
        TrangThaiLichHen: "Đã xác nhận"
    });
}
const cancelAppointmentModel = async (idAppointment) => {
    await db('dondathen').where('DdhID', idAppointment).update({
        TrangThaiLichHen: "Đã hủy"
    });
}
const addAppointmentModel = async (idTenant, idLandlord, idPost, data) => {
    await db('dondathen').insert({
        NguoiDatHen: idTenant,
        NgayGap: data.date + ' ' + data.time,
        ChuTro: idLandlord,
        TinID: idPost,
        TrangThaiLichHen: 'Chưa xác nhận'
    })
}
const checkAppointmentModel = async (idPost, idUser) => {
    const appointment = await db('dondathen')
        .where('TinID', idPost)
        .where('NguoiDatHen', idUser)
        .first();

    return appointment !== undefined;
};

export { confirmAppointmenLandlord, cancelAppointmentModel, addAppointmentModel, checkAppointmentModel }