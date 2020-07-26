import request from "../../utils/request";

export function login(data: any) {
  return request({
    url: "/login",
    method: "post",
    data: data
  });
}
export function code() {
  return request({
    url: "/code",
    method: "get"
  });
}
export function getImage() {
  return request({
    url: "/getimage",
    params: "get"
  });
}
