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
        .orderBy('NgayDatHen', 'desc')
        .first()
    console.log(appointment)
    if (appointment) {
        if (appointment.TrangThaiLichHen != "Đã hủy")
            return appointment;
        else
            return undefined;
    }
};

const findAllAppointments = async (filter) => {
    let result = db('dondathen').select('*');
    if (filter) {
        if (filter === "Chưa xác nhận" || filter === "Đã xác nhận" || filter === "Đã hủy")
            result = result.where('TrangThaiLichHen', filter);
        else if (filter === "Cũ nhất")
            result = result.orderBy('NgayDatHen', 'asc');
        else if (filter === "Mới nhất")
            result = result.orderBy('NgayDatHen', 'desc')
    }
    result = await result;

    return result;
}

const findApmByID = async (id) => {
    return await db('dondathen').where('DdhID', id).first();
}

const updateApm = async (id, apm) => {
    await db('dondathen').where('DdhID', id).update(apm);
}

const addApm = async (apm) => {
    await db('dondathen').insert({
        NguoiDatHen: apm.NguoiDatHen,
        ChuTro: apm.ChuTro,
        TinID: apm.TinID,
        TrangThaiLichHen: apm.TrangThaiLichHen,
        NgayGap: apm.NgayGap
    });
}

const deleteApmByID = async (id) => {
    await db('dondathen').where('DdhID', id).del();
}

export { confirmAppointmenLandlord, cancelAppointmentModel, 
         addAppointmentModel, checkAppointmentModel, 
         findAllAppointments, findApmByID, updateApm,
         addApm, deleteApmByID }