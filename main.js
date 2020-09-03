// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, webContents} = require('electron')
const path = require('path')

const bot = require('./bot').connection;
const { memberList } = require('./bot');

let mainWindow;
function createWindow () {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.webContents.on('dom-ready', (event) => {
    console.log('yay dom ready')
    getMembers();
    getSpeaker();
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



// To get the current users in channel at any point, do:
console.log("Users currently in channel: ", memberList);

// To get info on users in channel, listen to this event (updates memberList whenever users enter/leave channel)

function getMembers(){
  console.log(memberList)
  bot.on('voiceStateUpdate', memberList => {
    console.log("Channel members: ", memberList);
    mainWindow.webContents.send('membersInfo', memberList)
  })
}

// To get speech change info, listen to this event:

function getSpeaker(){
  bot.on('speechChange' ,  ([user, speaking]) => {
    console.log("CS", user, speaking);
    if(speaking.bitfield == 1){
      mainWindow.webContents.send('speakerInfo',user)
    } else {
      console.log('aha! you aint speaking!')
    }
  });
}








