// electron tidak support import, jadi harus pake require
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    // browser window dengan native properties options
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //   browser window dengan win sebagai variabel
  win.setBackgroundColor("#fafafa");

  win.webContents.openDevTools();
  //   file yang akan diload
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  // kalau windows dan linux langsung bisa buat window
  createWindow();

  //   kalau mac, harus diaktifkan dulu
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // kalau windows dan linux langsung bisa quit
  if (process.platform !== "darwin") {
    app.quit();
  }
});
