//just the start
//link to continue button
'use strict';
const continueButton = document.getElementById("continue");
const myvidsButton = document.getElementById("myVids");
//listener
continueButton.addEventListener("click", buttonAction);
myvidsButton.addEventListener("click", myvidsAction);

//respond function
function buttonAction() {
  let nickname = document.getElementById("video").value;
  let userName = document.getElementById("username").value;
  let Url = document.getElementById("url").value;

  sessionStorage.setItem("pick",nickname);
  sessionStorage.setItem("link",Url);

  
  //sth like struct contain data
  let videoData= {
     "userName" : userName, 
    "Url" : Url,
    "nickname" : nickname,
    
  }
  
  console.log("we got", nickname);
  sendPostRequest('/videoData',videoData)
    .then( function (response) {
      //checking
    console.log("Response", response);
    if (response === "Database is full") {
     
      window.alert(response); 
    } 
    else {
      sessionStorage.setItem("nickname", nickname);
      window.location = "preview.html";
    }
  })
  .catch(function(error) {
    console.log("Error occurred:", error)
  });
  
  
}
function myvidsAction() {
  window.location = "/myvids.html";
  
}

//send post request to server
async function sendPostRequest(url,data) {
  console.log("about to send post request");
  let response = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    //stringigy make the struct we send into string
    body: JSON.stringify(data) });
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}