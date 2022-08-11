import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { HintBackend, HintLocation } from "./backend/hintBackend";
import { RandoBackend } from "./backend/randoBackend";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 530,
    minHeight: 710,
    width: 1050,
    height: 850,
    maxWidth: 1920,
    maxHeight: 1080,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const backend = new RandoBackend();
const hints = new HintBackend();
//Bootstrap initial state
ipcMain.handle('randoFull', async (event) => {
  //console.log('Full rando state loading');
  return backend.getState();
});

ipcMain.handle('randoPoll', async (event) => {
  //console.log('Scanning for state changes');
  return backend.getStateChanges();
});

ipcMain.handle('randoDisconnect', async () => {
  console.log('Detatching auto-tracker');
  return backend.disconnect();
});

ipcMain.handle('randoKeyItemCheck', async (event, ...items) => {
  return items.map(i => backend.checkKeyItemCount(i)).reduce((a,b)=>a+b);
});

ipcMain.handle('randoItemCheck', async (event, ...items) => {
  return items.map(i => backend.checkItemCount(i)).reduce((a,b)=>a+b);
});

ipcMain.handle('randoRoleLevelCheck', async (event, char, role) => {
  return backend.checkRoleLevel(char, role);
});

ipcMain.handle('randoChapterCheck', async (event, chapter) => {
  return backend.checkChapterStatus(chapter);
});

//Area hints??
/*
ipcMain.handle('hint-areaHintCheck', async (event, _) => {
  const libra = backend.getLibraInventory();
  return hints.resolveAreaHints(libra);
});*/

ipcMain.handle('hint-randodataloc', async (event, loc) => {
  return hints.setupRandoDataLocation(loc);
});

ipcMain.handle('hint-seeddocsloc', async (event, loc) => {
  return hints.setupSeedDocsDir(loc);
});

ipcMain.handle('hint-loadHints', async (event, _) => {
  hints.prepareHintMapping();
  return hints.parseSeedData();
});

ipcMain.on('hint-debugHints', async (event, _) => {
  hints.debugSeedData();
});