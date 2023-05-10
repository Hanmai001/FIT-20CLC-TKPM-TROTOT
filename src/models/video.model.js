import db from "../config/db.config";

const addVideoModel = async (des, name, idHouse) => {
    const [idVideo] = await db('video').insert(
        {
            ChiTietVideo: '../.' + des + name
        }, 'VideoID').returning('VideoID');
    await addVideo_House(idVideo, idHouse)

}
const addVideo_House = async (idVideo, idHouse) => {
    await db('video_tindangtro').insert({ VideoID: idVideo, TinID: idHouse });
}
const findVideosOfHouse = async (idHouse) => {
    const res = await db('video_tindangtro').where('TinID', '=', idHouse).select('VideoID');
    return res;

}
const deleteVideoModel = async (idHouse) => {
    const res = await findVideosOfHouse(idHouse);
    const ids = res.map(item => item.VideoID);
    console.log(res);
    await db('video').whereIn('VideoID', ids).delete();
    await db('video_tindangtro').where('TinID', '=', idHouse).del();
}
export { addVideoModel, deleteVideoModel }