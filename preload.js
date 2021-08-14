const { ipcRenderer } = require("electron");
const fs = require('fs')
const path = require('path')

window.addEventListener('DOMContentLoaded', () => {
    saveButton = document.querySelector('button')
    saveButton.addEventListener('click', function() {
        username = document.querySelector('#twitchUsername').value
        content = {
            username
        }
        ipcRenderer.send("updateUsername");
        fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(content));
        console.log(username)
    })
})
