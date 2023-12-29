import axios from "axios"
import { ACCESS_TOKEN, getItem } from "./localStorageManager";

let origin=process.env.REACT_APP_BASE_URL;

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Z-Key",
    }
  };

export const axiosClient=axios.create({
  baseURL:origin
})



//Request and Response Interceptors

axiosClient.interceptors.request.use(request=>{
    const accessToken=getItem(ACCESS_TOKEN);
    request.headers["Authorization"]=`Bearer ${accessToken}`
    console.log("request.headers",request.headers)
    return request;
  });