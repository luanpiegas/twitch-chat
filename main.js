const { app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const fs = require('fs')

let settingsFile = fs.readFileSync(path.join(__dirname, '.', 'settings.json'))
let userSettings = JSON.parse(settingsFile)

const template = [
    {
        label: 'Chat',
        click(item, browserWindow) {
            let settingsFile = fs.readFileSync(path.join(__dirname, '.', 'settings.json'))
            let userSettings = JSON.parse(settingsFile)
            browserWindow.loadURL(`https://www.twitch.tv/${userSettings.username}/chat`)
            console.log(browserWindow.loadURL(`https://www.twitch.tv/${userSettings.username}/chat`))
        }
    },
    {
        label: 'Configurações',
        click: function (item, browserWindow) {
            browserWindow.loadFile(`settings.html`)
        }
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createMainWindow() {

    const mainWindow = new BrowserWindow({
        width: userSettings.width,
        height: userSettings.height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL(`https://www.twitch.tv/${userSettings.username}/chat`)

    // mainWindow.webContents.toggleDevTools()

}

app.on('ready', async () => {

    createMainWindow()

})

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') app.quit()

})