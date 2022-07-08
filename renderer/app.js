const { ipcRenderer } = require("electron")
const items = require('./items')


// Dom nodes
let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemUrl = document.getElementById('url'),
    search = document.getElementById('search')

    // Filter items with search
    search.addEventListener('keyup', e => {

        // Loop thru items
        Array.from( document.getElementsByClassName('read-item') ).forEach( item => {
          
            // hide items that don't match
            let hasMatch = item.innerText.toLowerCase().includes(search.value)
            item.style.display = hasMatch ? 'flex' : 'none'
        })
    })

    // Navigate item selection with up/down arrows
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
           items.changeSelection(e.key) 
        }
    })

    // Disable & enable modal button
    const toggleModalButtons = () => {

        // check button state
        if (addItem.disabled === true) {
            addItem.disabled = false
            addItem.style.opacity = 1
            addItem.innerText = ' Add Item'
            closeModal.style.display = 'inline'
        } else {
           addItem.disabled = true
           addItem.style.opacity = 0.5
           addItem.innerText = ' Adding...'
           closeModal.style.display = 'none'
        }
    }
    
    // show modal
    showModal.addEventListener('click', e => {
        modal.style.display = 'flex'
        itemUrl.focus()
    })

    // close modal
    closeModal.addEventListener('click', e => {
        modal.style.display = 'none'
    })

    // Handle add item
    addItem.addEventListener('click', e => {

        // checkif url exist
        if (itemUrl.value) {
            
            // send new item url to main process
            ipcRenderer.send('new-item', itemUrl.value)

            // Disable buttons
            toggleModalButtons()
        }
    })

    // Listen for new item from main process
    ipcRenderer.on('new-item-success', (e, newItem) => {
        
        // Add new item to "items" node
        items.addItem(newItem, true)

        // Enable buttons
        toggleModalButtons()

        // Hide Modal and clear value
        modal.style.display = 'none'
        itemUrl.value = ""
    })

    // Listen for keyboard submit
    itemUrl.addEventListener('keyup', e => {
        if(e.key === 'Enter' ) addItem.click()
    })