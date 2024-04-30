import http from "@/api";
import { BaseUrl } from "../config/servicePort";
// 获取审核员
export const getVerifierList = () => {
  return http.get(BaseUrl + `/adminVerifier/getVerifierList`, { noLoading: true }, { noLoading: true });
};
// 添加审核员
export const addVerifier = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/addVerifier`, params, { noLoading: true });
};

// 编辑审核员
export const editVerifier = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/editVerifier`, params, { noLoading: true });
};

// 删除审核员
export const removeVerifier = (params: any) => {
  return http.post(BaseUrl + `/adminVerifier/removeVerifier`, params, { noLoading: true });
};

// 获取分类信息
export const getCategoryInfo = () => {
  return http.get(BaseUrl + `/home/getHomeInfo`, { noLoading: true }, { noLoading: true });
};

// 添加分类信息
export const addCategoryInfo = (params: any) => {
  return http.post(BaseUrl + `/category/addCategory`, params, { noLoading: true });
};

//删除分类
export const removeCategoryInfo = (params: any) => {
  return http.post(BaseUrl + `/category/removeCategory`, params, { noLoading: true });
};

//添加学科
export const addSubject = (params: any) => {
  return http.post(BaseUrl + `/category/addSubject`, params, { noLoading: true });
};

//修改学科信息
export const editSubjectInfo = (params: any) => {
  return http.post(BaseUrl + `/category/editSubjectInfo`, params, { noLoading: true });
};

//获取所有用户信息
export const getAllUsers = () => {
  return http.get(BaseUrl + `/user/getAllUser`, {}, { noLoading: true });
};

//封冻用户账号
export const frozenUserAccount = (params: any) => {
  return http.post(BaseUrl + `/user/frozenUser`, params, { noLoading: true });
};

//删除用户账号
export const deleteUserAccount = (params: any) => {
  return http.post(BaseUrl + `/user/removeUser`, params, { noLoading: true });
};
