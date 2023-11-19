import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getPlanList(param) {
    const result = await local.get(`plan/listPlan`, { params: param });
    return result.data.list;
}


export {
    getPlanList,
}

