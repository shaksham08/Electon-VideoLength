//importing electron library
const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron; //getting app property

//if getting error make sure give proper ffmpeg path
ffmpeg.setFfprobePath(__dirname + "//..//..//ffmpeg//ffprobe.exe");
ffmpeg.setFfmpegPath(__dirname + "//..//..//ffmpeg//ffprobe.exe");
/*
-----------electron process----------

Electron starts

app process is called  - take some amount of time

app ready to start doing things - need to wait till here

..
..
..
app closes down
*/

let mainWindow;

//running when app is ready to start doing things
app.on("ready", () => {
  // start a new broswer window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log("The video duration is :- ", metadata.format.duration);
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
