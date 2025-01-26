
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const apiUrl = `https://flowers-world.onrender.com/users/${userId}`; // Correctly interpolate the userId into the URL
    const cardContainer = document.getElementById("user-card-container");

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((user) => {
        // Create the card element
        const card = document.createElement("div");
        card.className = " shadow-lg";
        // card.style.width = "50rem";

        // Populate the card with user details
        card.innerHTML = `
          <div class="card-body text-center py-4">
            <div class="d-flex justify-content-center gap-3 pb-3">
                        
              <a target="" class="text-white text-decoration-none btn btc border rounded p-2" href="changepassAdmin.html">Change Password</a>
              <a target="" class="text-white text-decoration-none btn btc border rounded p-2" href="updateProfileAdmin.html">Update Your Profile</a>
                        
            </div>
            <h5 class="card-title text-center">${user.first_name || "N/A"} ${user.last_name || "N/A"}'s Profile</h5>
            <div class="card-text justify-content-center">           
              <img src="./Images/man.jpg" alt="Admin Image" class="img-fluid rounded mt-2" style="max-height: 60px;">                          
            </div>
            <p class="card-text"><strong>ID:</strong> ${user.id}</p>
            <p class="card-text"><strong>Username:</strong> ${user.username}</p>
            <p class="card-text"><strong>First Name:</strong> ${user.first_name || "N/A"}</p>
            <p class="card-text"><strong>Last Name:</strong> ${user.last_name || "N/A"}</p>
            <p class="card-text"><strong>Email:</strong> ${user.email}</p>
            <p class="card-text"><strong>Is Superuser:</strong> ${user.is_superuser ? "Yes" : "No"}</p>
            
            </div>
        `;

        // Append the card to the container
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Failed to load user details.";
        cardContainer.appendChild(errorMessage);
      });
});

