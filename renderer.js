// In renderer process (web page).
const { ipcRenderer } = require('electron');

let usersList;
// Fetch Users from local backend
fetch('http://localhost:8080/users/info',{
  method:"GET",            
  headers: {
    'Content-Type': 'application/json'
   }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    usersList = data
  })

// Fetch podcast title
fetch('http://localhost:8080/title',{
  method:"GET",            
  headers: {
    'Content-Type': 'application/json'
   }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById('title').innerHTML = `Ep. ${data.episodeNumber}-${data.title}`
  })


// Get image of the user
function getImages(username,id){
  fetch('http://localhost:8080/users/image/'+username,{
  method:"GET",            
  headers: {
    'Content-Type': 'image/png'
  }
  })
  .then(res => res.blob())
  .then(data => {
    console.log(data)
    burl = URL.createObjectURL(data)
    console.log(burl)
    document.getElementById(id).src = burl
  })
}

let memberList;
let currentmemberList = [[]];
let speaker;
ipcRenderer.on('speakerInfo', (event, message) => {
  console.log("From Main Speaker list",message)
  speaker = message[0];
  console.log(speaker, message[1])
  if(message[1].bitfield) {
    speakers();
  }
  else {
    removeSpeaker();
  }

})

function speakers(){
  console.log("YOOOOOOOOOOO",speaker.discriminator)
  var s = document.getElementById(speaker.discriminator)
  s.classList.add('iconspeak')
}

function removeSpeaker() {
  console.log("Stopped speaking")
  var s = document.getElementById(speaker.discriminator)
  s.classList.remove('iconspeak')
}

ipcRenderer.on('membersInfo', (event, message) => {
  console.log("From Main Members list",message)
  console.log("NEWWW",memberList);
  console.log('Current', currentmemberList);
  memberList = message;
  console.log('TEST',JSON.stringify(Array.from(memberList[0])));
  if (JSON.stringify(Array.from(currentmemberList[0])) !== JSON.stringify(Array.from(memberList[0]))){
    members();
    currentmemberList = memberList
  } else {
    currentmemberList = memberList
    console.log('SAMEEEEEEEEE')
  }

  console.log("OUTNEWW",memberList);
  console.log('OUT CURRENTT', currentmemberList);
})

function members(){
  let members_list = '';
  for (var it=memberList[0].values(), val = null; val=it.next().value; ) {
    if(usersList.hasOwnProperty(val.username)){
      you = val.username;
      members_list += `
      <div class="person">
        <img src class="icon" id=${val.discriminator}>
        <div class="info">
          <p>${usersList[you]["display_name"]}</p>
          <p id="tag">${usersList[you]["tagline"]}</p> 
        </div>
      </div>
      `
      getImages(val.username,val.discriminator);
    }
  } 
  document.getElementById('container').innerHTML = members_list;
}
