// In renderer process (web page).
const { ipcRenderer } = require('electron')

let memberList;
ipcRenderer.on('speakerInfo', (event, message) => {
  console.log("From Main Speaker list",message)
})

ipcRenderer.on('membersInfo', (event, message) => {
  console.log("From Main Members list",message)
  memberList = message;
  members();
})

function members(){
  let members_list = '';
  for (var it=memberList[0].values(), val = null; val=it.next().value; ) {
    console.log(val);
    members_list += `
    <div class="person">
      <img src="./assets/blushing_dino.png" class="icon">
      <div class="info">
        <p>${val.username}</p>
        <!-- <p>Head of Dinos</p> -->
      </div>
    </div>
    `
  } 
  document.getElementById('container').innerHTML = members_list;
}
