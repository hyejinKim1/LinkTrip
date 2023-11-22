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

async function updateArticle(param) {
    console.log(param);
    await local.patch(`community/updateArticle`, param);
}

export {
    getArticleList,
    deleteComment,
    createComment,
    createLike,
    createScrap,
    updateArticle
}