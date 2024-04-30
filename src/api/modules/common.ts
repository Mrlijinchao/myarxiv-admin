import http from "@/api";
import { BaseUrl } from "../config/servicePort";
export const getSubjectList = () => {
  return http.get(BaseUrl + `/category/getSubjectList`, {}, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
