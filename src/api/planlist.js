import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getMyPlanList(param) {
    const result = await local.get(`plan/listMyPlan`, { params: param });
    return result.data.list;
}

async function getScrapPlanList(param) {
    const result = await local.get(`plan/listScrapPlan`, { params: param });
    return result.data.list;
}

export {
    getMyPlanList,
    getScrapPlanList
}

