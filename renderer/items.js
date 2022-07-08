
// DOM nodes
let items = document.getElementById('items')

// Track items in storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

// Persist storage
exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage))
} 

// Set item as selected
exports.select = e => {

    // Remove currently selected item class
    document.getElementsByClassName('read-item selected')[0].classList.remove('selected')

    // Add clicked item
    e.currentTarget.classList.add('selected')
}

// Add new item
exports.addItem = (item, isNew = false) => {
  
    // Create a new DOM node
    let itemNode = document.createElement('div')

    // Assign "read-item" class
    itemNode.setAttribute('class', 'read-item')

    // Add innerHTML
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`

    // Append new node to "items"
    items.appendChild(itemNode)


    // Attach click handler to select
    itemNode.addEventListener('click', this.select)

    // if this is the first item select it
    if (document.getElementsByClassName('read-item').length === 1) {
       itemNode.classList.add('selected')
    }

    // Add item storage
    if (isNew) {
        this.storage.push(item)
        this.save()
    }
}

// Add items from storage when app loads
this.storage.forEach( item => {
    this.addItem(item), false
});