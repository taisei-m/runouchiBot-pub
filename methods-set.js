function set_uzai(){
      Send_list = ncmb.DataStore("arp");
      Send_list.equalTo("userId","0000")
      var items = Send_list.fetchAll();
      var item = items[0];
      item.set("exist", "false");
      item.update();
        outputLog(JSON.stringify(item))
      outputLog(item.fields.exist);
}  





function set_send_true(id){
  Person = ncmb.DataStore("send_list");
      Person.equalTo("userId", id)
      var items = Person.fetchAll();
      var item = items[0];
      item.set("send_true", "true");
      item.update();
}


function set_send_false(){
  Person = ncmb.DataStore("send_list");
      var items = Person.fetchAll();
  for(var i=0; i<items.length; i++){
      var item = items[i];
      item.set("send_true", "false");
      item.update();
  }
}







function set_notify_enter_false(id){
  Person = ncmb.DataStore("person");
      Person.equalTo("userId", id)
      var items = Person.fetchAll();
      var item = items[0];
      item.set("notify_enter", "false");
      item.update();
}

function set_notify_enter_true(){
  Person = ncmb.DataStore("person");
  try{
      var items = Person.fetchAll();
      var length = items.length;
      outputLog(length);
    for(var i=0; i<items.length; i++ ){
      var item = items[i];
      item.set("notify_enter", "true");
      item.update();
    }
  }catch(e){
    outputLog(e)
     return ;
  }
}
  


  


        
function set_beacon_data(hwid, userId, display_name){
 // outputLog("メソッドすたーと");
  Person = ncmb.DataStore("person");
  try{
  //  outputLog("try");
      Person.equalTo("userId", userId)
      var items = Person.fetchAll();
      var item = items[0];
      item.set('hwid', hwid);
      item.set('display_name', display_name);
      item.set("exist_room", "true");
      item.update();
  }catch(e){
   // outputLog("catch");
     person.set("hwid", hwid)
      .set("userId", userId)
      .set("sleep", "true")
      .set('display_name', display_name)
      .set('exist_room', "true")
    　.set('notify_enter', "true")
      .save()
     return ;
  }
  //  outputLog("fainaly");
}
  
 
function set_exist_room_false(){
 // outputLog("メソッドすたーと");
  Person = ncmb.DataStore("person");
  try{
  //  outputLog("try");
      Person.equalTo("exist_room", "true")
      var items = Person.fetchAll();
      var length = items.length;
      outputLog(length);
    for(var i=0; i<items.length; i++ ){
      var item = items[i];
      item.set("exist_room", "false");
      item.update();
    }
  }catch(e){
     return ;
  }
}
  


 
        
function set_message_data(userId, display_name){
 // outputLog("メソッドすたーと");
  Person = ncmb.DataStore("person");
  try{
 //   outputLog("try");
      Person.equalTo("userId", userId)
      var items = Person.fetchAll();
      var item = items[0];
      item.set('display_name', display_name);
      item.update();
      //    outputLog("tryfinish");
  }catch(e){
  //  outputLog("catch");
     person.set("userId", userId)
      .set('display_name', display_name)
      .save()
     return ;
  }
  //  outputLog("fainaly");
}
        
 
function set_beacon_data_log(hwid, userId, display_name){ 
  person_log.set("hwid", hwid)
      .set("userId", userId)
      .set('display_name', display_name)
      .save() 
}

function set_message_data_log(userId, message, display_name){ 
     //   outputLog("method datalog");
  person_log.set("userId", userId)
      .set('message', message)
      .set('display_name', display_name)
      .save()
}
 
        
function set_sleep(userId, sleep){
  Person = ncmb.DataStore("person");
  Person.equalTo("userId", userId)
      var items = Person.fetchAll();
      var item = items[0];
      item.set('sleep', sleep);
      item.update();
}


function set_sleep_log(userId, sleep){ 
  person_log.set("sleep", sleep)
            .set("userId", userId)
            .save() 
}
       
        
        
