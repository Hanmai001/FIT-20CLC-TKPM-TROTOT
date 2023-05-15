import db from "../config/db.config";

const addingReport = async (idTenant, idPost, data) => {
    await db('baocao').insert({
        NguoiBaoCao: idTenant,
        TinID: idPost,
        NgayBaoCao: '2021-01-15',
        LiDoChiTiet: data.description
    })
}


export { addingReport }