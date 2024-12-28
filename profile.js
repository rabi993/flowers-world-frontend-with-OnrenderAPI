// Fetch and display user data
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const apiUrl = `https://flowers-world.onrender.com/users/${userId}`; // Correctly interpolate the userId into the URL
    const tableBody = document.getElementById("user-table-body");
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((user) => {
        // Create a new row for the user
        const row = document.createElement("tr");

        // Create table cells for user data
        const idCell = document.createElement("td");
        idCell.textContent = user.id;
        row.appendChild(idCell);

        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        const firstNameCell = document.createElement("td");
        firstNameCell.textContent = user.first_name || "N/A";
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = user.last_name || "N/A";
        row.appendChild(lastNameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const isSuperuserCell = document.createElement("td");
        isSuperuserCell.textContent = user.is_superuser ? "Yes" : "No";
        row.appendChild(isSuperuserCell);

        // Append the row to the table body
        tableBody.appendChild(row);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
});



// Fetch and display user and buyer data in a card
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const buyerId = localStorage.getItem('buyer_id'); // Get the buyer ID from local storage
    const userApiUrl = `https://flowers-world.onrender.com/users/${userId}`; // User API URL
    const buyerApiUrl = `https://flowers-world.onrender.com/buyers/list/${buyerId}`; // Buyer API URL
    const cardContainer = document.getElementById("user-card-container");

    // Fetch user and buyer data in parallel
    Promise.all([fetch(userApiUrl), fetch(buyerApiUrl)])
      .then(async ([userResponse, buyerResponse]) => {
        if (!userResponse.ok || !buyerResponse.ok) {
          throw new Error("Error fetching data");
        }
        const user = await userResponse.json();
        const buyer = await buyerResponse.json();

        // Create the card element
        const card = document.createElement("div");
        card.className = "card p-3 shadow-lg";
        card.style.width = "25rem";

        // Populate the card with user and buyer details
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-center">${user.first_name || "N/A"} ${user.last_name || "N/A"}'s Profile</h5>
            <div class="card-text w-25 m-auto">
            ${
              buyer.image
                ? `<img src="${buyer.image}" alt="Buyer Image" class="img-fluid rounded mt-2" style="max-height: 200px;">`
                : "<p class='text-muted'>No image available</p>"
            }
            </div>
            <h6 class="mt-3">User Details:</h6>
            <p class="card-text"><strong>ID:</strong> ${user.id}</p>
            <p class="card-text"><strong>Username:</strong> ${user.username}</p>
            <p class="card-text"><strong>First Name:</strong> ${user.first_name || "N/A"}</p>
            <p class="card-text"><strong>Last Name:</strong> ${user.last_name || "N/A"}</p>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>User's Roll:</strong> ${user.is_superuser ? "Admin/Superuser" : "Buyer"}</p>
            
            <h6 class="mt-3">Buyer Details:</h6>
            <p class="card-text"><strong>Buyer ID:</strong> ${buyer.id}</p>
            <p class="card-text"><strong>Mobile No:</strong> ${buyer.mobile_no || "N/A"}</p>
            <p class="card-text"><strong>Address:</strong> ${buyer.address || "N/A"}</p>
            
        `;

        // Append the card to the container
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.error("Error fetching user or buyer data:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Failed to load user or buyer details.";
        cardContainer.appendChild(errorMessage);
      });
});
