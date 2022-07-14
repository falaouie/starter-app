// Electron-Updater Module
const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

// Configure log debugging
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Disable auto download of updates
autoUpdater.autoDownload = false

// Single export to check for and apply any available updates
module.exports = () => {

    // check for update (GH Releases)
    autoUpdater.checkForUpdates()

    // Listen for update found
    autoUpdater.on('update-available', () => {
       
        // prompt the user to start download
        dialog.showMessageBox({
           type: 'info',
           title: 'Update Available',
           message: 'A new version of Readit is available. Do you want to update now?',
           buttons: ['Update', 'No']
        }).then( result => {

            let buttonIndex = result.response

            // if button index 0 (update), start downloading
            if( buttonIndex === 0 ) autoUpdater.downloadUpdate()
        })

    })

    // Listen for update downloaded
    autoUpdater.on('update-downloaded', () => {

        // prompt the user to install the update
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Ready',
            message: 'Install & Restart now?',
            buttons: ['Yes', 'Later']
        }).then( result => {

            let buttonIndex = result.response

            // if button index 0 install & restart (Yes)
            if( buttonIndex === 0 ) autoUpdater.quitAndInstall(false, true)
        })
    })
}