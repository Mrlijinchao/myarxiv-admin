import http from "@/api";
import { BaseUrl } from "../config/servicePort";
// 论文审核通过
export const paperApprove = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/approve`, params);
};
// 论文挂起
export const paperOnHold = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/onHold`, params);
};
// 论文解除挂起
export const paperAnnulOnHold = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/annulOnHold`, params);
};

// 修改密码
export const changeUserInfo = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/changeUserInfo`, params);
};
