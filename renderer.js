const { ipcRenderer, webUtils } = require('electron');
// Populate COM port dropdown
async function loadPorts() {
  const ports = await ipcRenderer.invoke('list-ports');
  const select = document.getElementById('comPort');
  ports.forEach(port => {
    const option = document.createElement('option');
    option.value = port;
    option.text = port;
    select.appendChild(option);
  });
}
loadPorts();


var port, bootloader, partitions, bootapp, code;

document.getElementById('bootloader').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const bootloaderfile = webUtils.getPathForFile(file);
    console.log('File name:', bootloaderfile);
    bootloader = bootloaderfile;
  }
});
document.getElementById('partitions').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const partitionsfile = webUtils.getPathForFile(file);
    console.log('File name:', partitionsfile);
    partitions = partitionsfile;
  }
});
document.getElementById('bootapp').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const bootappfile = webUtils.getPathForFile(file);
    console.log('File name:', bootappfile);
    bootapp = bootappfile;
  }
});
document.getElementById('code').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const codefile = webUtils.getPathForFile(file);
    console.log('File name:', codefile);
    code = codefile;
  }
});



// Handle "Generate Command" button click
function generateCommand() {
  port = document.getElementById('comPort').value;
  console.log("Port:", port);
  console.log("Bootloader:", bootloader);
  console.log("Partitions:", partitions);
  console.log("BootApp:", bootapp);
  console.log("Code:", code);

  if (!bootloader || !partitions || !bootapp || !code || !port) {
    alert("Please select all files and a COM port.");
  }
  
  ipcRenderer.invoke('flash-esp32', {
    port,
    bootloader,
    partitions,
    bootApp0: bootapp,
    code
  }).then(command => {
    console.log("Generated Flash Command:\n", command);
    document.getElementById('output').textContent = command;
  }).catch(err => {
    console.error("Error generating command:", err);
    document.getElementById('output').textContent = `Error: ${err.message}`;
  });
}

// Hook up to your HTML button
document.getElementById('generateBtn').addEventListener('click', generateCommand);
