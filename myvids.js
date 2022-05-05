'use strict';



const uploadWrapper = document.getElementById("uploadWrapper");
const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const align = document.getElementById("align");









//for get the videos inside the database

getdbVideos();
async function sendGetnickname(url) {
  let response = await fetch(url);

  if (response.ok) {
    let data = await response.json();
    console.log(data);
    return data;

  }
  else {
    throw Error(response.status);
  }
}

async function getdbVideos() {

 

  let data = await sendGetnickname("/getList");

 if(data.length < 8){
    disableGameButton();
    ActivateAddButton()
  }

  if(data.length >=8){
    ActivateGameButton();
    disableAddButton();
  }
 
  for (let i = 0; i < data.length; i++) {
    console.log(data.length);

    console.log(data[i].nickname);

    const align = document.createElement("div");
    align.setAttribute("class", "align");
    const videoDisplay = document.createElement("div");
   



    videoDisplay.setAttribute("class", "videoDisplay");
    if (data[i].nickname == null) {
      videoDisplay.textContent = "   ";
    }
    else {
      videoDisplay.textContent = data[i].nickname;
    }
    videoDisplay[i] = data[i].nickname;
    align.appendChild(videoDisplay);
     

    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "buttonDiv");
    const buttonDisplay = document.createElement("button");
    buttonDisplay.setAttribute("class", "buttons");
    buttonDisplay.textContent = "x";
    buttonDiv.appendChild(buttonDisplay);
    align.appendChild(buttonDiv);
    if(i+1<=4){
       column1.appendChild(align);
     }
    if(i+1>4){
      column2.appendChild(align);
    }


    buttons[i].addEventListener("click", function() {
      buttonAction(i);





    });

    function buttonAction(i) {
      
      let vidData = textboxes[i].textContent;
      let vidDataObj = {
        nickname: vidData
      };
      console.log(textboxes[i].textContent);


      sendPostRequest('/vidDel', vidDataObj)
        .then(function(response) {
          //checking
          console.log("Response", response);


        })
        .catch(function(error) {
          console.log("Error occurred:", error)
        });
      setTimeout("location.reload(true);", 1500);

    }
    console.log(buttons[i]);
    console.log("videodisplay", videoDisplay[i]);


  }

  console.log(data.length);

  for (let i = 1; i <= 8 - (data.length); i++) {

    // console.log(data[i].nickname);

    const align = document.createElement("div");
    align.setAttribute("class", "align");
    
    const videoDisplay1 = document.createElement("div");
    //videoDisplay.setAttribute("type", "text");

    videoDisplay1.setAttribute("class", "videoDisplay1");

    videoDisplay1.textContent = "  ";


    align.appendChild(videoDisplay1);

    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "buttonDiv");
    const buttonDisplay = document.createElement("button");
    buttonDisplay.setAttribute("class", "buttons");
    buttonDisplay.textContent = "x";
    buttonDiv.appendChild(buttonDisplay);
    align.appendChild(buttonDiv);

    if(8 - (data.length)<4){
       column2.appendChild(align);
    }
    if(8 - (data.length)>=4){
      if(i<=(4-(data.length))){
       column1.appendChild(align);
     }
    if(i>(4-(data.length))){
      column2.appendChild(align);
     
    }
    }
 

   



  }

}





async function sendPostRequest(url, data) {
  console.log("about to send post request");
  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //stringigy make the struct we send into string
    body: JSON.stringify(data)
  });
  if (response.ok) {
    let data = await response.text();

    return data;
  } else {
    throw Error(response.status);
  }
}




let buttons = document.getElementsByClassName("buttons");
let textboxes = document.getElementsByClassName("videoDisplay");










const AddButton = document.getElementById("myVids");


AddButton.addEventListener("click", AddNew);



// disable the game button
function disableGameButton() {
  const game_btn = document.getElementById("game");
  game_btn.style.backgroundColor = "gray";
 
  document.getElementById("game").disabled = true;
}
// disable the add button
function disableAddButton() {
  const vids_btn = document.getElementById("myVids");
   vids_btn.style.backgroundColor = "gray";
  //document.getElementById("myVids").bgcolor="#808080";
  document.getElementById("myVids").disabled = true;
  
}
//activate the game button
function ActivateGameButton() {
  document.getElementById("game").disabled = false;
}
//activate the add button
function ActivateAddButton() {
  document.getElementById("myVids").disabled = false;
}


//respond function
function AddNew() {
  window.location = "/tiktokpets.html";
}