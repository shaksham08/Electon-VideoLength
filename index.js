//importing electron library
const electron = require("electron");

const { app, BrowserWindow } = electron; //getting app property

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

//running when app is ready to start doing things
app.on("ready", () => {
  const mainWindow = new BrowserWindow({}); // start a new broswer window
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
