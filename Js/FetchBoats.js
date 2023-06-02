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
        <button onclick="deleteBoat(${boat.boatId})">Slet båd</button>
        <form onsubmit="event.preventDefault(); updateBoatType(${boat.boatId}, this)">
            <label for="boatType_${boat.boatId}">Updater båd type:</label>
            <input type="text" id="boatType_${boat.boatId}" required>
            <button type="submit">Update</button>
        </form>
      `;
    boatContainer.appendChild(boatElement);
};

function updateBoatType(id, form) {
    const boatTypeInput = form.querySelector(`#boatType_${id}`);
    const boatType = boatTypeInput.value;

    fetch(`http://localhost:8080/UpdateBoat?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ boatType })
    })
        .then(response => response.json())
        .then(updatedBoat => {
            const boatElement = boatContainer.querySelector(`#boat_${updatedBoat.boatId}`);
            if (boatElement) {
                boatElement.querySelector('p:nth-child(2)').textContent = `Boat Type: ${updatedBoat.boatType}`;
            }
            boatTypeInput.value = '';
        })
        .catch(error => console.error('Error:', error));
}

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
            console.log('Boat deleted successfully'); // Replace with your logic to handle the successful deletion
            const boatElement = boatContainer.querySelector(`#boat_${id}`);
            if (boatElement) {
                boatElement.remove();
            }
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}
