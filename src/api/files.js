import request from "./request";

export const getFileList = () => {
  return request({
    url: "/upload/files",
    method: "get",
  });
};

export const delFile = (data) => {
  return request({
    url: "/upload/del",
    method: "post",
    data,
  });
};
