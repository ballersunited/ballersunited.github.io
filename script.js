import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";//dont change
import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";//dont change
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
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
let auth = fbauth.getAuth(app);

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

//Register Code
$("#register").on("click", ()=>{
  let email = $("#regemail").val();
  let p1 = $("#regpass1").val();
  let p2 = $("#regpass2").val();
  if (p1 != p2){
    alert("Passwords don't match");
    return;
  }
  fbauth.createUserWithEmailAndPassword(auth, email, p1).then(somedata=>{
    let uid = somedata.user.uid;
    let userRoleRef = rtdb.ref(db, `/users/${uid}/roles/user`);
    rtdb.set(userRoleRef, true);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});
//End of Register Code
//Start of Login Code
$("#login").on("click", ()=>{
  let email = $("#logemail").val();
  let pwd = $("#logpass").val();
  fbauth.signInWithEmailAndPassword(auth, email, pwd).then(
    somedata=>{
      console.log(somedata);
      showNextPage();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});
//End of Login Code
let userid = "";
let clickHandler = function(){
 //alert(1);
  let message = $("#msg").val();
  let email = $("#logemail").val();
  let username = "";
  var i = 0;
  while(email[i] != "@"){
    username = username + email[i];
    i++;
  }
  rtdb.push(chatRef,username + " : " + message + "    " + "<button id=\"" + username + "\">"+ "Delete" + "</button>");
  console.log(username + " : " + message + "    " + "<button id=\"" + username + "\">"+ "Delete" + "</button>")
  userid = "#" + username;
}

var clickHandlerClear = function(){
  //alert(1);
  var msg = $("#msg").val();
  rtdb.set(chatRef, []);
  rtdb.push(chatRef,"Beginning of The Conversation : ");
}

var logoutClick = function(){
  document.getElementById('logpass').value = '';
  document.getElementById('logemail').value = '';
  showNextPage();
}

var pages = ['page1', 'page2'];
var currentPageIndex = 0;
var showNextPage = function(){
  document.getElementById(pages[currentPageIndex]).classList.add('hidden');
  currentPageIndex = (currentPageIndex + 1) % pages.length;
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
}
$("#sendme").click(clickHandler);
$("#clear").click(clickHandlerClear);
$("#getout").click(logoutClick);
//$("#page1").click(showNextPage);