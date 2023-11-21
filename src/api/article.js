import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getViewArticle(param) {
    console.log(param);
    const result = await local.get(`community/viewArticle`, { params: param });
    return result.data;
}

export {
    getViewArticle
}