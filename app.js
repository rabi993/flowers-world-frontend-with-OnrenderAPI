
// Check if the user is logged in
if (localStorage.getItem("buyer_id")) {
  // Show Logout and Profile links
  document.querySelector(".logout-menu").classList.remove("d-none");
  document.querySelector(".dash-menu").classList.remove("d-none");
  // document.querySelector(".aut_menu").classList.remove("d-none");
  document.querySelector(".aut_menu1").classList.remove("d-none");
  // document.querySelector(".aut_menu2").classList.remove("d-none");

  // Hide Login and Registration links
  document.querySelector(".login-menu").classList.add("d-none");
  document.querySelector(".registration-menu").classList.add("d-none");
} else {
  // Show Login and Registration links
  document.querySelector(".login-menu").classList.remove("d-none");
  document.querySelector(".registration-menu").classList.remove("d-none");

  // Hide Logout and Profile links
  document.querySelector(".logout-menu").classList.add("d-none");
  document.querySelector(".dash-menu").classList.add("d-none");
  // document.querySelector(".aut_menu").classList.add("d-none");
  document.querySelector(".aut_menu1").classList.add("d-none");
  // document.querySelector(".aut_menu2").classList.add("d-none");
}
  
document.addEventListener('DOMContentLoaded', () => {
  const buyerId = localStorage.getItem('buyer_id');
  const profileIcon = document.getElementById('profile_icon');
  const profileIcon2 = document.getElementById('profile_icon2');

  if (buyerId) {
    fetch(`https://flowers-world-two.vercel.app/buyers/list/${buyerId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.image) {
          // Update the profile image to the one fetched from the API
          profileIcon2.src = data.image;
          profileIcon2.style.display = 'inline'; // Show the new image
          profileIcon.style.display = 'none';   // Hide the default image
        }
        
      })
      .catch(error => {
        console.error('Error fetching buyer data:', error);
      });
  }
});


      
    


const loadServices = () => {
  // Fetch services from the API
  fetch('https://flowers-world-two.vercel.app/services/')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => displayService(data))
    .catch((err) => {
      console.error("Failed to fetch services:", err);
      displayErrorMessage("Failed to load services. Please try again later.");
    });
};

const displayService = (services) => {
  const parent = document.getElementById("service-container");

  // Clear the parent container first (optional, in case of multiple calls)
  parent.innerHTML = "";

  services.forEach((service) => {
    const li = document.createElement("li");
    // li.classList.add("mb-4"); // Optional: Add spacing between items
    li.innerHTML = `
      <div class="card shadow service_card">
        <div class="ratio ratio-16x9">
          <img
            src="${service.image}"
            class="card-img-top service_card_img"
            loading="lazy"
            alt="${service.name || 'Service Image'}"
          />
        </div>
        <div class="card-body p-3  service_card_body">
          <h3 class="card-title h5">${service.name || "Unnamed Service"}</h3>
          <p class="card-text">
            ${service.description ? service.description.slice(0, 40) : "No description available."}...
          </p>
          <a href="service.html" class="btn btn-primary">Details</a>
        </div>
      </div>
    `;
    parent.appendChild(li);
  });
};

const displayErrorMessage = (message) => {
  const parent = document.getElementById("service-container");
  parent.innerHTML = `<p class="text-danger">${message}</p>`;
};

// Call loadServices when the DOM is ready
document.addEventListener("DOMContentLoaded", loadServices);



const loadFlowers = (search = "") => {
  const flowersContainer = document.getElementById("flowers");
  const spinner = document.getElementById("spinner");
  const noData = document.getElementById("nodata");

  flowersContainer.innerHTML = "";
  spinner.style.display = "block";
  noData.style.display = "none";

  const url = `https://flowers-world-two.vercel.app/flowers/list/?search=${search}`;
  console.log("Fetching data from:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.style.display = "none";
      if (data.results && data.results.length > 0) {
        displayFlowers(data.results);
      } else {
        noData.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching flowers:", error);
      spinner.style.display = "none";
      noData.style.display = "block";
    });
};


  
  const displayFlowers = (flowers) => {
    // Sort flowers array by id in descending order
    const sortedFlowers = flowers.sort((a, b) => b.id - a.id);

    let newTagLimit = 6;
    let showLimit = 6;

  
    const flowersContainer = document.getElementById("flowers");
    flowersContainer.innerHTML = ""; // Clear previous content if any
    // <small style="color: grey; margin: 0px;font-size:10px;">${flower.content.slice(0, 20)}...</small>
    sortedFlowers.forEach((flower, index) => {
      const isNew = index < newTagLimit; 
      
      if (index >= showLimit) return;
      const div = document.createElement("div");
      div.classList.add("allflower-card2", "col-12", "col-md-6", "col-lg-6","mb-4",);
      div.innerHTML = `
        <img class="allflow-img2 img-fluid w-100" src="${flower.image}" alt="${flower.title}" />
        
        
        
        <h4 class="pt-3">${flower.title} ${flower.category.map((item) => `<small  style="color: #e07265;font-size:10px; " class="">${item}</small>`).join("")} <small style="margin: 0px;font-size:15px; "><b>Available:</b> ${flower.available} Piece</small> ${isNew ? '<button class="btn btcn btn-sm ms-2 new2">NEW Arrival</button>' : ''}</h4>
      
        <p style="margin: 0px; "<b>Price:</b> ${flower.price}$</p>
        <div>${flower.color.map((item) => `<small style="color: #e07265; " class="  ">${item}, </small>`).join("")}</div>
        
          <a style="text-decoration: none;" class="btn btc rounded text-white mt-1" href="flowerDetails.html?flowerId=${flower.id}">Details</a>
          
        
      `;
      flowersContainer.appendChild(div);
    });
  };
  

  
  const loadCategory = () => {
    fetch("https://flowers-world-two.vercel.app/categories/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-cat");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `<button style="width:100%; margin:auto;" class="btn btcn text-white" onclick="loadFlowers('${item.name}')">${item.name}</button>`;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  const loadColor = () => {
    fetch("https://flowers-world-two.vercel.app/colors/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-color");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `<button style="width:100%; margin:auto;" class="btn btcn text-white" onclick="loadFlowers('${item.name}')">${item.name}</button>`;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };
  
  
  const handleSearch = () => {
    const value = document.getElementById("search").value.trim();
    loadFlowers(value);
  };

  
const loadFlowersspring = () => {
  const flowersContainer = document.getElementById("flowers2");
  const spinner = document.getElementById("spinner");
  const noData = document.getElementById("nodata");

  flowersContainer.innerHTML = "";
  spinner.style.display = "block";
  noData.style.display = "none";

  const url = `https://flowers-world-two.vercel.app/flowers/list/`;
  console.log("Fetching data from:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.style.display = "none";
      if (data.results && data.results.length > 0) {
        displayFlowersspring(data.results);
      } else {
        noData.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching flowers:", error);
      spinner.style.display = "none";
      noData.style.display = "block";
    });
};


  
  const displayFlowersspring = (flowers) => {
    // Sort flowers array by id in descending order
    // const sortedFlowers = flowers.sort((a, b) => b.id - a.id);
    

    
    let showLimit = 6;

  
    const flowersContainer = document.getElementById("flowers2");
    flowersContainer.innerHTML = ""; // Clear previous content if any
    // <small style="color: grey; margin: 0px;font-size:10px;">${flower.content.slice(0, 20)}...</small>
    flowers.forEach((flower, index) => {
      
      
      if (index >= showLimit) return;
      const div = document.createElement("div");
      div.classList.add("allflower-card3", "col-md-6", "col-lg-6",);
      div.innerHTML = `
      <a style="text-decoration: none; color:black"  href="flowerDetails.html?flowerId=${flower.id}">
        <img class="allflow-img3 img-fluid " src="${flower.image}" alt="${flower.title}" />
        
        
        
        <h4>${flower.title} <small style="margin: 0px;font-size:15px; "><b>Available:</b> ${flower.available} Piece</small>  </h4>
        
        
          </a>
          
        
      `;
      flowersContainer.appendChild(div);
    });
  };
  
  
  // Load initial data on page load
  document.addEventListener("DOMContentLoaded", () => {
    loadFlowers();
    loadCategory();
    loadColor();
    loadFlowersspring();
  });


const loadReview = () => {
  fetch("https://flowers-world-two.vercel.app/flowers/reviews/")
    .then((res) => res.json())
    .then((data) => displayReview(data))
    .catch((error) => console.error("Error fetching reviews:", error));
};

const displayReview = (reviews) => {
  const parent = document.getElementById("review-container");
  parent.innerHTML = ""; // Clear existing reviews

  reviews.forEach((review) => {
    let username = "Unknown User";
    let fullName = "Anonymous Reviewer";
    let image = "./Images/man.jpg";
    let flowerName = "Unknown Flower";

    // Fetch reviewer information
    fetch(`https://flowers-world-two.vercel.app/users/${review.reviewer}`)
      .then((res) => res.json())
      .then((userData) => {
        username = userData.username;
        fullName = `${userData.first_name || "admin"} ${userData.last_name || "islam"}`;

        // Fetch the complete buyer list
        return fetch("https://flowers-world-two.vercel.app/buyers/list/");
      })
      .then((res) => res.json())
      .then((buyersData) => {
        const buyerData = buyersData.find((buyer) => buyer.user === username);
        if (buyerData) {
          image = buyerData.image || "./Images/man.jpg";
        } else {
          console.warn(`Buyer with username ${username} not found.`);
        }

        // Fetch flower information
        return fetch(`https://flowers-world-two.vercel.app/flowers/list/${review.flower}`);
      })
      .then((res) => res.json())
      .then((flowerData) => {
        flowerName = flowerData.title || "Unknown Flower";

        // Create and append the review card
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
          <img src="${image}" alt="Reviewer Image" />
          <h6>${fullName}</h6>
          <small>Flower: ${flowerName}</small></br>
          <small>${review.body.slice(0, 30)}</small>
          <h6>${review.rating}</h6>
        `;
        parent.appendChild(div);
      })
      .catch((error) => {
        console.error("Error processing review:", error);
      });
  });
};


loadServices();
loadReview();


const loadBuyerId = () => {
  const user_id = localStorage.getItem("user_id"); // Get the user_id from localStorage
  if (!user_id) {
    console.error("User ID is not found in localStorage.");
    return;
  }

  // Step 1: Fetch the username using user_id
  fetch(`https://flowers-world-two.vercel.app/users/${user_id}/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
      }
      return res.json();
    })
    .then((userData) => {
      // Store the username in localStorage
      localStorage.setItem("username", userData.username);
      const username = userData.username;

      // Step 2: Fetch the list of buyers
      return fetch(`https://flowers-world-two.vercel.app/buyers/list/`);
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch buyers: ${res.statusText}`);
      }
      return res.json();
    })
    .then((buyersData) => {
      // Step 3: Find the buyer with the matching username
      const username = localStorage.getItem("username");
      const buyer = buyersData.find((buyer) => buyer.user === username);
      if (buyer) {
        // Store the buyer_id in localStorage
        localStorage.setItem("buyer_id", buyer.id);
        console.log(`Buyer ID (${buyer.id}) stored successfully.`);
      } else {
        console.error("No buyer found with the specified username.");
      }
    })
    .catch((error) => {
      console.error("Error fetching or processing data:", error);
    });
};

// Call the function
loadBuyerId();





