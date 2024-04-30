import http from "@/api";
import { BaseUrl } from "../config/servicePort";
export const paperAudit = (params: any) => {
  return http.post(BaseUrl + `/paper/audit`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};

export const queryPaper = (params: any) => {
  return http.get(BaseUrl + `/paper/queryPaper`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
