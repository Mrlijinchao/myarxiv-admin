import http from "@/api";

// 获取审核员
export const downloadFile = (cid: any) => {
  return http.get(`http://127.0.0.1:8099/file/new`, { cid }, { responseType: "blob" }, { noLoading: true });
};
