import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getArticleList(param) {
    console.log(param);
    const result = await local.get(`community/listArticle`, { params: param });
    return result.data;
}

async function deleteComment(param) {
    console.log(param);
    await local.delete(`community/deleteComment`, { params: param  });
}

export {
    getArticleList,
    deleteComment
}