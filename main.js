//linebotと繋ぐ
var CHANNEL_ACCESS_TOKEN = 'oihbvUe4mKqXVghUJjlK3rULvpZsJMXCkSIqNsxnknzDh8cf5Eb3c6niT6BkL7Czty4HRU+XUEmRQmDaVFTlt62Z3zSUX2MqLEV5y7ptVCVx3QiHKaaEF/5cmXS244NUG4XN6/PRqrr8YYfU9dhkVwdB04t89/1O/w1cDnyilFU='; 

//spreadsheetsにjsonのログをとる
function outputLog(data) {
  var id = "1EB_0ArEeH5RRpFZSQpAc3cwz4gYqQ2iXctVAP2xJr2Q";  
  var spreadSheet = SpreadsheetApp.openById(id);  
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}


//ニフクラの設定
var application_key = "b472d2ab52ea8c125dd824e2f2da7a3804263d15dd8ae9c2abfab01546e2ca4c";
var client_key = "1c6e63f8db4776114481fbc1129ab2cc59f3bf0e2faa1d0eb48e83be32cbf1d6";
var ncmb = NCMB.init(application_key, client_key);
var Test = ncmb.DataStore("test");
var Master = ncmb.DataStore("master");
var Person = ncmb.DataStore("person");
var Person_log = ncmb.DataStore("person_log");
var master = new Master();
var person = new Person();
var person_log = new Person_log();

 
//メインメソッド
function doPost(e) {
 outputLog(JSON.stringify(e))
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  var userId = json.events[0].source.userId;
  if (typeof reply_token === 'undefined') {
    return;
  } 
    
  
  var type = json.events[0].type;
  var reply_message;
  var keyword;
  var beacon_hwid;
  var display_name;
  var check_hwid;   ////DBから持ってきたhwid
  var check_keyword;////DBから持ってきたキーワード
  var wifi_paswd;
  var waiting_msg;
  var reply_message;
  var reply_message_paswd;
  var reply_message_good;
  var notify_enter;
  var all_userId = [];
  var count_all_userId;
  var m1;
  var m2;
  var m3;
  var m4;
  
    if(type == 'beacon'){ ///////////////////////////////////////////////////////////beacon
      
     beacon_hwid = json.events[0].beacon.hwid;
     display_name = getUserDisplayName(userId, CHANNEL_ACCESS_TOKEN);
      set_beacon_data(beacon_hwid, userId, display_name);
      sleep = get_sleep(userId);
      set_beacon_data_log(beacon_hwid, userId, display_name); 
      push_userId = "U2012df34792adf4ce94b2b36d669bd59"
      
      if(sleep == "false"){////////////////////////////////////beaconに反応したときに通知するかどうか
         reply_message = 'ビーコンに反応したよ';
         var url = 'https://api.line.me/v2/bot/message/reply';
         return reply1(CHANNEL_ACCESS_TOKEN, reply_token, reply_message);
      }
      
      
      
      notify_enter = get_notify_enter(userId);/////////////入室時の通知
      if(notify_enter === "true"){
//       m1 = make_list_notify();    来た人と在室している人
         m1 = get_fool_name(userId) + "\nが入室しました"     ///来た人のみ
         outputLog(m1);
         set_notify_enter_false(userId);
            
        
         count_all_userId = get_count_all_userId(); 
        outputLog("cout=" +count_all_userId);
        for(var i=0; i<count_all_userId; i++){  
          push1(CHANNEL_ACCESS_TOKEN, get_send_userId(i), m1);
        }
      }
        
     
  
                
      
      //////////////////////////////////////////////////////////////////////////////postback
    } else if(type == "postback"){ 
        postbackdata = json.events[0].postback.data;
        if(postbackdata == "うるさい"){
           set_sleep(userId, "true");
           set_sleep_log(userId, "true", keyword);
        　　m1 = "”通知OFF”にしました";
           reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
       } else if(postbackdata == "起きて"){
           set_sleep(userId, "false");
           set_sleep_log(userId, "false", keyword);
        　　m1 = "”通知ON”にしました";
        　　m2 = "ビーコンに反応するとメッセージで通知します"
           reply2(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2);
      } else if (postbackdata == "反応がない"){
    　　　   m1 = "合言葉を入力する前にビーコンに反応している必要があります。";
            m2 = "反応させる方法がわからない場合は「メニュー」→「使いかた」→”ビーコンに反応しない”を押してください。";
            reply2(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2);
      } else if (postbackdata == "違うといわれる"){
              m1 = "今あなたがいる施設のビーコンに反応していない可能性があります。";
              m2 = "メニューから”SSID表示”のボタンを押して施設名が正しいか確認してください。";
              m3 = "施設名が違う場合, 反応がない場合は今いる施設のビーコンに反応していません。";
             reply3(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3)
      } else if (postbackdata == "ビーコンに反応しない"){
              m1 = "通知設定から通知をonにすると、ビーコンに反応した時メッセージが送信されます。";
              m2 = "LINEの \"設定\"＞\"プライバシー管理\"＞\"情報の提供\" にある \"LINE beacon\"にチェックは入っていますか？";
              m3 = "端末のBluetoothはオンになっていますか？ Bluetoothのon/offを繰り返してみてください。";
              m4 = "それでも反応しない場合、お使いの端末ではLINEbeaconに対応していない可能性があります";
       　　　 reply4(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3, m4);
      }      
      
    

    //////////////////////////////////////////////////////////////////////////////////message
    } else if(type == 'message'){  
      keyword = json.events[0].message.text;
      display_name = getUserDisplayName(userId, CHANNEL_ACCESS_TOKEN);
      
      set_message_data_log(userId, keyword, display_name); 
      set_message_data(userId, display_name);
      ////////////////////////////////////////隠し合言葉
      if(keyword == "おるか"){
         oruka(reply_token);
      } else if(keyword == "Oi" ){
         oruka_mas(reply_token);
      }
     ///////////////////////////////////////////通知設定
      else if(keyword == "通知on/off"){   
        var url = 'https://api.line.me/v2/bot/message/reply';
        return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "postback",
        "label": "通知 ON",
        "displayText": "通知ON",
        "data": "起きて"
      },
      {
        "type": "postback",
        "label": "通知 OFF",
        "displayText": "通知OFF",
        "data": "うるさい"
      }
    ],
    "title": "通知設定",
    "text": "端末がビーコンに反応するとメッセージで通知します。"
  }
},
      ],
    }),
  });
///////////返信まとまり
        //////////////////////////////////////////////////SSID
     } else if(keyword == "SSID・施設名"){
        try{
        　check_hwid = get_hwid_by_userId(userId);
          userId = null;
       　 check_ssId = get_ssId_by_hwid(check_hwid);
        　check_name = get_name_by_hwid(check_hwid);
         reply_message = check_ssId;
         reply_message_name = "施設名：" + check_name; 
         reply2(CHANNEL_ACCESS_TOKEN, reply_token, reply_message, reply_message_name);
        } catch(e){
          m1 ="ビーコンに反応していません";
          m2 ="お使いの施設にビーコンが設置されているか確認してください";
        reply2(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2);
        }
        
        
        ////////////////////////////////////////////////////////////////////使いかた
      } else if(keyword == "使い方"){
        var url = 'https://api.line.me/v2/bot/message/reply';
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "postback",
        "label": "ビーコンに反応しない",
        "displayText": "ビーコンに反応しない",
        "data": "ビーコンに反応しない"
      },
        
        
      {
        "type": "postback",
        "label": "入力しても反応がない",
        "displayText": "入力しても反応がない",
        "data": "反応がない"
      },
      {
        "type": "postback",
        "label": "入力しても違うといわれる",
        "displayText": "入力しても違うといわれる",
        "data": "違うといわれる"
      }
     
    ],
    "title": "使い方",
    "text": "友達や施設から聞いた合言葉をチャットに入力してくだい！wifiのパスワードをお教えします！"
  }  
},
 {'type': 'text',
         'text': "合言葉を入力する前にビーコンに反応している必要があります！",
 },
],
    }),
  });
      } else if(keyword == "Wi-Fiパスワード"){
        var url = 'https://api.line.me/v2/bot/message/reply';
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
 {'type': 'text',
         'text': "友達や施設から聞いた合言葉をチャットに入力してくだい！",
 },
 {'type': 'text',
         'text': "合言葉が一致するとパスワードをお教えします",
 },

],
    }),
  });
        
      } else{
         check_hwid = get_hwid_by_userId(userId);
         check_keyword = get_keyword_by_hwid(check_hwid);
         wifi_paswd = get_wifi_paswd_by_hwid(check_hwid);     
      if(keyword == check_keyword){
        　reply_message = "合言葉が一致したよ！"
          reply_message_paswd = wifi_paswd;
          reply_message_good = "wi-fiのパスワードです☆"
      } else {
          reply_message = "合言葉が違うよ(笑)";
          reply_message_paswd = "もう一度入力して";
          reply_message_good =　"がんばれ！";
      }
        
  var url = 'https://api.line.me/v2/bot/message/reply';
   UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {'type': 'text',
         'text': reply_message,},
        {'type': 'text',
         'text': reply_message_paswd,},
        {'type': 'text',
         'text': reply_message_good,},
      ],
    }),
  });
  ///////////////////返信まとまり
   
 }  ///keyword ==
        
      }   //type ==
        }  //post
        

       