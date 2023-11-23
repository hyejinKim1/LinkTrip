import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getArticleList(param) {
    console.log(param);
    const result = await local.get(`community/listArticle`, { params: param });
    return result.data;
}

async function deleteComment(param) {
    console.log(param);
    await local.delete(`community/deleteComment`, { params: param });
}

async function createComment(param) {
    console.log(param);
    await local.post(`community/createComment`, param);
}

async function createLike(param) {
    console.log(param);
    await local.post(`community/createLikeArticle`, param);
}

async function createScrap(param) {
    console.log(param);
    await local.post(`community/createScrap`, param);
}

async function checkLikeArticle(param) {
    console.log(param);
    const result = await local.get(`community/checkLikeArticle`, { params: param })
    return result.data.isLike;
}

async function createLikeArticle(param) {
    console.log(param);
    await local.post(`community/createLikeArticle`, null, { params: param });
}

async function deleteLikeArticle(param) {
    await local.delete(`/community/deleteLikeArticle`, { params: param });
}
async function updateArticle(param) {
    console.log(param);
    await local.patch(`community/updateArticle`, param);
}

async function createArticle(param) {
    console.log(param);
    await local.post(`community/createArticle`, param);
}

async function listMyArticle(param) {
    console.log(param);
    const result = await local.get(`community/listMyArticle`, { params: param });
    return result.data;
}

async function listLikedArticle(param) {
    console.log(param);
    const result = await local.get(`community/listLikedArticle`, { params: param });
    return result.data;
}




export {
    getArticleList,
    deleteComment,
    createComment,
    createLike,
    createScrap,
    checkLikeArticle,
    createLikeArticle,
    deleteLikeArticle,
    updateArticle,
    createArticle,
    listMyArticle,
    listLikedArticle
}