export const getStartEndHr = (date:Date,value:"start"|"end")=>{
  if(value === "start"){
    date.setHours(0,0,0,0);
    return date;
  }else{
    date.setHours(23,59,59,999);
    return date;
  }
}
export const  formatDate = ()=>{
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
