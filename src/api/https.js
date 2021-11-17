import axios from 'axios'
import * as config from './../config.js'
import {chainID} from './util'
import {AIR_BOX_API_URL} from "../../config/prod";

// axios.defaults.timeout = config.API_TIME;
// axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param methodName
 * @param data
 * @returns {Promise}
 */
export function post(url, methodName, data = []) {
  // axios.defaults.baseURL = config.API_URL;
  return new Promise((resolve, reject) => {
    //console.log(data);
    const params = {"jsonrpc": "2.0", "method": methodName, "params": data, "id": Math.floor(Math.random() * 1000)};
    //console.log(params);
    axios.post(url, params)
      .then(response => {
        //console.log(response);
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

export async function request(params) {
  const { url, method = "post", data } = params;
  let baseUrl = config.AIR_BOX_API_URL
  // if (url === "/tx/cross/bridge/transfer") {
  //   baseUrl = "/nabox-api"
  // }
  const language = localStorage.getItem("lang") === "cn" ? "CHS" : "EN";
  const newData = method === "post" ? {data: {language, ...data}} : {params: {language, ...data}};
  return new Promise((resolve, reject) => {
    //console.log(newData);
    axios({url: baseUrl + url, method: method, ...newData}).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

