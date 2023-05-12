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

export { confirmAppointmenLandlord, cancelAppointmentModel }