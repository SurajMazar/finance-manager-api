import { ItemPerPage } from "../app/config/site.config";

export const formatResponse = (data:any,success:boolean)=>{
  return {
    success:success,
    data:data
  }
}


export const paginate = (name:string,page:number,total:number,data:any)=>{
  let responseData:any = {};
  responseData[name] = data
  responseData['pageMeta'] = {
    perPage:ItemPerPage,
    total:total,
    currentPage:page?page:1
  }
  return responseData;
}
