

const boatList = document.getElementById("boatList");
const typeInput = document.getElementById("type")


const fetchBoatList = () => {
    fetch("http://localhost:8080/GetBoats")
        .then((response) => response.json())
        .then((data) => {
            boatList.innerHTML = "";

            data.forEach((boatModel) => {
                const aboutUsElement = document.createElement("div");
                aboutUsElement.innerHTML = `
              <h3>${boatModel.id}</h3>
              <h3>${boatModel.type}</h3>
              <button onclick="deleteBoat('${boatModel.id}')">Delete</button>
            `;

                boatList.appendChild(boatElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching boat list:", error);
            showMessage("Error fetching boat list", true);
        });
};

const createBoat = (event) => {
    event.preventDefault();

    const type = typeInput.value;



    const boat = {
        type
    };

    fetch("http://localhost:8080/CreateBoat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(boat),
    })
        .then((response) => {
            if (response.ok) {
                type.value = "";
                showMessage("Boat entry created successfully");
                fetchBoatList();
            } else {
                throw new Error("Error creating boat entry");
            }
        })
        .catch((error) => {
            console.error("Error creating boat entry:", error);
            showMessage("Error creating boat entry", true);
        });
};

const deleteBoat = (boatId) => {
    fetch(`http://localhost:8080/DeleteBoat/${boatId}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                showMessage("Boat entry deleted successfully");
                fetchBoatList();
            } else {
                throw new Error("Error deleting boat entry");
            }
        })
        .catch((error) => {
            console.error("Error deleting boat entry:", error);
            showMessage("Error deleting boat entry", true);
        });
}

// Initial fetch to display the about us list
fetchBoatList();


