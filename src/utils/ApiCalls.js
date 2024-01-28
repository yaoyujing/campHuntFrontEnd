import axios from "axios";
const baseurl = "http://localhost:8000/"
export function ApiCalls(method,url, data, apiResponse){
    return axios({
        method: method,
        url: url,
        data:data,
      })
        .then((response)=> {
          apiResponse(url,response)
    }).catch((err)=>{
      console.log(err)
    });
}

export const URL ={
  home:baseurl,
  getCampgrounds: baseurl + "getRecords",
  createCampground:baseurl+"createCampground",
  editCampground:baseurl+"editCampground",
  deleteCampground: baseurl+"deleteCampground"
}