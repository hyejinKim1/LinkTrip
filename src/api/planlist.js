import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getMyPlanList(param) {
    const result = await local.get(`plan/MylistPlan`, { params: param });
    return result.data.list;
}

async function getScrapPlanList(param) {
    const result = await local.get(`plan/ScraplistPlan`, { params: param });
    return result.data.list;
}

export {
    getMyPlanList,
    getScrapPlanList
}

