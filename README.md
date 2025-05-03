# ESP32 Flash Tool

**ThryveTech ESP Flash Tool** is a simple, cross-platform desktop application that allows you to flash firmware to ESP32 devices using `esptool.exe`. Built with Electron, it provides a basic UI for selecting COM ports and firmware binaries, making firmware flashing faster and easier—no command line required.

---

## ⚙️ Features

- Auto-detection of available COM ports
- Flash bootloader, boot_app0, partition table, and application binaries
- Real-time flashing logs from `esptool.py`
- Cross-platform UI (Windows, macOS, Linux)
- Clean and minimal design

---

## 🛠 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hippyaki/ESP32-Flash-Tool.git
cd ESP32-Flash-Tool
```

### 2. Install Dependencies

```bash
npm install
```

### 💻 Run in Development Mode

Start the Electron app with live-reload support:

```bash
npm start
```

### 📦 Build the App

Build the packaged application for your platform:

```bash
npm run dist
```
> ❗ If you encounter a node-gyp error during build, visit: https://github.com/nodejs/node-gyp
> ✅ Windows Users:    
> Run this command in PowerShell (as Administrator) to install required build tools:
>  ```bash
> choco install python visualstudio2022-workload-vctools -y
>  ```
    
### 🔧 Modify the Source Code

- Entry point: `main.js` or `electron.js` – main Electron process
- UI: `index.html`, `renderer.js`, and `styles/scripts` in the root or `/src`
- Electron Builder config: inside `package.json` under "build" field
- After changes, re-run:
  ```bash
  npm start
  ```
### 📁 Project Structure
```bash
thryvetech-esp-flash-tool/
├── assets/               # App icons and static resources
├── main.js               # Electron main process
├── index.html            # App UI
├── renderer.js           # Renderer logic
├── package.json          # Project config
└── ...
```
### 🧪 Requirements

- Node.js v16 or v18 recommended
- Git
- `esptool.exe` is bundled and used internally
