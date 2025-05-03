const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const { SerialPort } = require('serialport');


function createWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 380,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: 'favicon.ico',
    menu: null
  });

  win.loadFile('index.html');

  if (process.platform === 'win32') {
    win.removeMenu();
  }

}



// Handle COM port request
ipcMain.handle('list-ports', async () => {
  const ports = await SerialPort.list();
  return ports.map(port => port.path);
});

// Handle flashing request
ipcMain.handle('flash-esp32', async (event, args) => {
  const {
    port,
    bootloader,
    partitions,
    bootApp0,
    code
  } = args;

  // console.log("Args ->", args);
  // console.log("Port:", port);
  // console.log("Bootloader:", bootloader);
  // console.log("Partitions:", partitions);
  // console.log("bootApp0:", bootApp0);
  // console.log("Code:", code);

  const esptoolPath = path.join(__dirname, 'esptool.exe');
  const commandArgs = [
    '--chip', 'esp32s3',
    '--port', port,
    '--baud', '921600',
    '--before', 'default_reset',
    '--after', 'hard_reset',
    'write_flash', '-e', '-z',
    '--flash_mode', 'keep',
    '--flash_freq', 'keep',
    '--flash_size', 'keep',
    '0x0', bootloader,
    '0x8000', partitions,
    '0xe000', bootApp0,
    '0x10000', code
  ];

  console.log('Generated command:', esptoolPath, ...commandArgs);

  // Return output or error
  return new Promise((resolve, reject) => {
    execFile(esptoolPath, commandArgs, (error, stdout, stderr) => {
      if (error) {
        resolve(`Error:\n${stderr}`);
      } else {
        resolve(`Success:\n${stdout}`);
      }
    });
    console.log("promise run");
  });
});

app.whenReady().then(createWindow);
