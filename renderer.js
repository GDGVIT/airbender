// In renderer process (web page).
const { ipcRenderer } = require('electron')

ipcRenderer.on('speakerInfo', (event, message) => {
  console.log("From Main Speaker list",message)
})

ipcRenderer.on('membersInfo', (event, message) => {
  console.log("From Main Members list",message)
})