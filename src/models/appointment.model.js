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
const addAppointmentModel = async (idTenant, idLandlord, data) => {
    await db('dondathen').insert({
        NguoiDatHen: idTenant,
        NgayGap: data.date + ' ' + data.time,
        ChuTro: idLandlord
    })
}

export { confirmAppointmenLandlord, cancelAppointmentModel, addAppointmentModel }