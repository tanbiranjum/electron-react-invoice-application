const path = require('path')
const { app, BrowserWindow, webContents } = require('electron')
const isDev = require('electron-is-dev')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Ag Software',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
  win.on('close', function (e) {
    const choice = require('electron').dialog.showMessageBoxSync(this, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?',
    })
    if (choice === 1) {
      e.preventDefault()
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
