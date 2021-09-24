import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";//dont change
import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";//dont change
//import $ from "https://cdn.skypack.dev/jquery@3.6.0";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz-B9qzqWuUuinexmSt7fPdH2iK5s-AfQ",
  authDomain: "chat-app-time.firebaseapp.com",
  databaseURL: "https://chat-app-time-default-rtdb.firebaseio.com",
  projectId: "chat-app-time",
  storageBucket: "chat-app-time.appspot.com",
  messagingSenderId: "95661634418",
  appId: "1:95661634418:web:35e78c0f9ca24b5fdda3eb"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = rtdb.getDatabase(app);
let chatRef = rtdb.ref(db, "/chats");

let renderChat = function(data){
  let keys = Object.keys(data);
  $("#chats").html("");
  keys.map(anid=>{
    $("#chats").append(`<li>${data[anid]}</li>`);
  })
}

rtdb.onValue(chatRef, ss=>{
  let data = ss.val();
  if (!!data){
    renderChat(data);
  }
})

let clickHandler = function(){
  let message = $("#msg").val();
  rtdb.push(chatRef,message);
}
$("#sendme").click(clickHandler);