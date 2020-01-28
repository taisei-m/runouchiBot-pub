  
      


function get_fool_name(id){
  Person.equalTo("userId",id)
  var items = Person.fetchAll();
  var item = items[0];
  var result_hwid = item.fields.display_name;
     //outputLog(result_hwid);
     return result_hwid;
}

function get_good_where(id){
    Master.equalTo("hwid",id)
  var items = Master.fetchAll();
  var item = items[0];
  var result_hwid = item.fields.field_name;
     //outputLog(result_hwid);
     return result_hwid;
}


function get_hwid_by_userId(id){
  Person.equalTo("userId",id)
  var items = Person.fetchAll();
  var item = items[0];
  var result_hwid = item.fields.hwid;
     //outputLog(result_hwid);
     return result_hwid;
}
                              
function get_ssId_by_hwid (id){
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid",id)
  var items = Master.fetchAll();
  var item = items[0];
  var rson = item.fields.ssid;
     //outputLog(rson);
     return(rson);
}
                           
function get_name_by_hwid (id){
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid",id)
  var items = Master.fetchAll();
  var item = items[0];
  var rson = item.fields.field_name;
     //outputLog(rson);
     return(rson);
}
        
function get_keyword_by_hwid(id){
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid",id)
  var items = Master.fetchAll();
  var item = items[0];
  var result_keyword = item.fields.keyword;
    // outputLog(result_keyword);
     return result_keyword;
}

function get_wifi_paswd_by_hwid (id){
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid",id)
  var items = Master.fetchAll();
  var item = items[0];
  var rson = item.fields.wifiPswd;
     //outputLog(rson);
     return(rson);
}




function get_notify_enter(id){
  Person = ncmb.DataStore("person");
  Person.equalTo("userId",id)
  var items = Person.fetchAll();
  var item = items[0];
  var wrson = item.fields.notify_enter;
  return wrson;
  
}
        
function get_sleep(id){
  Person = ncmb.DataStore("person");
  Person.equalTo("userId",id)
  var items = Person.fetchAll();
  var item = items[0];
  var wrson = item.fields.sleep;
  return wrson;
}        
        

 function get_date(id){
  Person = ncmb.DataStore("person");
  Person.equalTo("userId",id)
  var items = Person.fetchAll();
  var item = items[0];
  var data = [];
  data = item.fields.updateDate;
  // outputLog(data)
   var hour = Number((data[11]) + (data[12])) + 9;
  data_send = data[5] + data[6] + "/" + data[8] + data[9] + "/" + hour + ":" + data[14] + data[15]; 
  // outputLog(data_send);
   return data_send;
 }



function get_count_all_userId(){
  var message =[];
  Person = ncmb.DataStore("person");
  Person.equalTo("send_push_notify", "true")
  var items = Person.fetchAll();
  message = items.length; 
  return parseInt(message);
  
}

function get_send_userId(i){
  var message;
  Person = ncmb.DataStore("person");
  Person.equalTo("send_push_notify", "true")
  var items = Person.fetchAll();
  message = items[i].fields.userId;
  return message;
}   

  
        
        
function getUserDisplayName(user_id, CHANNEL_ACCESS_TOKEN) {
  var line_endpoint_profile = 'https://api.line.me/v2/bot/profile';
  var res = UrlFetchApp.fetch(line_endpoint_profile + '/' + user_id, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' +  CHANNEL_ACCESS_TOKEN,
    },
    'method': 'get',
  });
  var h = JSON.parse(res).displayName;
  //outputLog(h);
  return h;
}

