import http from "@/api";
import { BaseUrl } from "../config/servicePort";
export const getSubmissionList = (params: any) => {
  return http.get(BaseUrl + `/submit/querySubmittedByPage`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
export const getReviewedPaperByVerifierId = (params: any) => {
  return http.get(BaseUrl + `/paper/queryPaperForBackground`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
export const getOnHoldSubmissionByVerifierId = (params: any) => {
  return http.get(BaseUrl + `/adminVerifier/getOnHoldSubmissionByVerifierId`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
export const getAllReviewedByVerifierId = (params: any) => {
  return http.get(BaseUrl + `/paper/queryPaperForBackground`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
export const getAllOnHoldByVerifierId = (params: any) => {
  return http.get(BaseUrl + `/adminVerifier/getOnHoldSubmissionByVerifierId`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
export const getUnreviewedSubmissionBySubjectId = (params: any) => {
  return http.get(BaseUrl + `/submit/querySubmittedByPage`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
export const getSubmissionInfoById = (params: any) => {
  return http.get(BaseUrl + `/user/submit/getSubmissionInfoById`, params, { noLoading: true }); // 正常 post json 请求  ==>  application/json
};
