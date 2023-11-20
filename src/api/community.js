import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getArticleList(param) {
    const result = await local.get(`community/listArticle`, { params: param });
    return result.data.articleList;
}

export {
    getArticleList
}