const addButton = document.getElementById('addButton'); // Button to add new product links
const partNameInput = document.getElementById('partName'); // Input for product name
const partLinkInput = document.getElementById('partLink'); // Input for the main product link
const auctionLinkInput = document.getElementById('auctionLink'); // Input for the auction link
const buttonsContainer = document.querySelector('.buttons'); // Container for displaying buttons

// Load parts when page is laoded
document.addEventListener('DOMContentLoaded', loadSavedParts);

// Add an event listener to the "Add Button"
addButton.addEventListener('click', function () {
    // Take away accidental spaces before and after
    const partName = partNameInput.value.trim();
    const partLink = partLinkInput.value.trim();
    const auctionLink = auctionLinkInput.value.trim();
    
    // Make sure they put in a name and at least one link
    if (partName === '' && (partLink === '' || auctionLink === '')) {
        alert('Please fill in part name and give a product link')
        return;
    }

    // Call functions
    createPartButtons(partName, partLink, auctionLink);
    savePartToLocalStorage(partName, partLink, auctionLink);

    // Reset inputs
    partNameInput.value = '';
    partLinkInput.value = '';
    auctionLinkInput.value = '';
});


function createPartButtons(partName, partLink, auctionLink) {
    // Create new div and add class
    const productDiv = document.createElement('div');
    productDiv.classList.add('button');

    // Regular part link button
    const partLinkButton = document.createElement('button'); 
    partLinkButton.textContent = `View ${partName}`; 
    partLinkButton.onclick = () => {
        if (partLink.trim() !== '') {
            window.open(partLink, '_blank');
        }
        else {
            alert("No Part Link")
        }
    }; 

    // Auction link butotn
    const auctionLinkButton = document.createElement('button');
    auctionLinkButton.textContent = `View ${partName} Auction`;
    auctionLinkButton.onclick = () => {window.open(auctionLink, '_blank');
        if (auctionLink.trim() !== '') {
            window.open(auctionLink, '_blank');
        }
        else {
            alert("No Auction Link")
        }
    }; 

    
    

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => { // Remove product from storage div
        buttonsContainer.removeChild(productDiv);
        removePartFromLocalStorage(partName);
    }

    // Add each button to productDiv
    productDiv.appendChild(partLinkButton);
    productDiv.appendChild(auctionLinkButton);
    productDiv.appendChild(deleteButton);
    // put productDiv a child of buttonsContainer
    buttonsContainer.appendChild(productDiv);
}

function savePartToLocalStorage(partName, partLink, auctionLink) {
    const parts = JSON.parse(localStorage.getItem('parts')) || []; // Get list of parts in storage
    parts.push({ partName, partLink, auctionLink }); // Add new parts to array
    localStorage.setItem('parts', JSON.stringify(parts)); // Put back all the parts
}

function loadSavedParts() {
    const parts = JSON.parse(localStorage.getItem('parts')) || []; // Get list of parts in storage
    parts.forEach(part => createPartButtons(part.partName, part.partLink, part.auctionLink)); // Loop to create each button 
}

function removePartFromLocalStorage(partName) {
    let parts = JSON.parse(localStorage.getItem('parts')) || []; // Get list of parts in storage
    parts = parts.filter(part => part.partName !== partName); // Create list and exclude part from list
    localStorage.setItem('parts', JSON.stringify(parts)); // Put back list into storage
}

   




