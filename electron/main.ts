import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/es5/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  Menu.setApplicationMenu(null);
  win.setMenu(null);
  win.removeMenu();

  win.setMenuBarVisibility(false);

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}