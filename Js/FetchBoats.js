/*
const boatContainer = document.getElementById('boat-container')
const boatForm = document.getElementById('boat-form')
    // Function to make a GET request to /ListOfBoats
function getListOfBoats() {
    fetch('http://localhost:8080/ListOfBoats')
        .then(response => response.json())
        .then(data => {
            boatContainer.innerHTML = ``;
            data.forEach(data => displayBoats(data))
            // Handle the response data
            console.log(data); // Replace with your logic to display the data on the frontend
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}

function displayBoats(boats) {
    const boatElement = document.createElement()('type');
    boatElement.classList.add('boats');
    boatElement.innerHTML = `
    <p>${boats.boatId2}</p>
    <p>${boats.boatType2}</p>
    `;
    boatContainer.appendChild(boatElement);

}

// Function to make a POST request to /CreateBoat
function createBoat(boat) {
    fetch('http://localhost:8080/CreateBoat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boat)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data); // Replace with your logic to handle the response
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}


*/

const boatForm = document.getElementById('boat-form');
const boatContainer = document.getElementById('boat-container');

function fetchBoats() {
    fetch('http://localhost:8080/ListOfBoats')
        .then(response => response.json())
        .then(boats => {
            boatContainer.innerHTML = '';
            boats.forEach(boat => displayBoat(boat));
        })
        .catch(error => console.error('Error:', error));
}

function displayBoat(boat) {
    const boatElement = document.createElement('boatType');
    boatElement.classList.add('boat');
    boatElement.innerHTML = `
        <p>${boat.boatId}</p>
        <p>${boat.boatType}</p>
      `;
    boatContainer.appendChild(boatElement);
};

boatForm.addEventListener('submit', event => {
    event.preventDefault();

    const idInput = document.getElementById('boatId');
    const typeInput = document.getElementById('boatType');

    const newBoat = {
        boatId: idInput.value,
        boatType: typeInput.value,

    };

    fetch('http://localhost:8080/CreateBoat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBoat)
    })
        .then(response => response.json())
        .then(createdBoat => {
            displayBoat(createdBoat);
            idInput.value = '';
            typeInput.value = '';
        })
        .catch(error => console.error('Error:', error));
});

fetchBoats();

// Function to make a DELETE request to /DeleteBoat
function deleteBoat(id) {
    fetch(`http://localhost:8080/DeleteBoat?id=${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            // Handle the successful deletion
            console.log('Boat deleted successfully'); // Replace with your logic to handle the successful deletion
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}




