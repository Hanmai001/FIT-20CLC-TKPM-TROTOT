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

export { addVideoModel }