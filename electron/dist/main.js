"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/es5/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    electron_1.Menu.setApplicationMenu(null);
    win.setMenu(null);
    win.removeMenu();
    win.setMenuBarVisibility(false);
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map