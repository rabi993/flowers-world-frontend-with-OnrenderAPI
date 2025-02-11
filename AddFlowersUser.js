
const fetchFlowers = () => {
  const flowersList = document.getElementById("flowers-list");
  flowersList.innerHTML = `<tr><td colspan="9" class="text-center">Loading flowers...</td></tr>`;

  fetch("https://flowers-world-two.vercel.app/flowers/list/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch flowers.");
      }
      return response.json();
    })
    .then((data) => {
      const flowers = data.results;
      flowersList.innerHTML = ""; // Clear the table rows

      const loggedInUser = localStorage.getItem("username"); // Corrected key to 'username'
      const userFlowers = flowers.filter((flower) => flower.FlowerMalik === loggedInUser);

      if (userFlowers.length === 0) {
        flowersList.innerHTML = `
          <tr>
            <td colspan="10" class="text-center">No flowers available.</td>
          </tr>`;
      } else {
        userFlowers.forEach((flower) => {
          const row = document.createElement("tr");          
          row.className = "winner__table";
          row.innerHTML = `
            <td>${flower.id}</td>
            <td>${flower.title}</td>
            <td>${flower.FlowerMalik}</td>
            <td>${flower.content.length > 50 ? flower.content.slice(0, 50) + '...' : flower.content}</td>
            <td>
              <img src="${flower.image}" alt="${flower.title}" 
                   style="width: 40px; height: 40px; object-fit: cover;">
            </td>
            <td>${Array.isArray(flower.category) ? flower.category.join(", ") : "N/A"}</td>
            <td>${Array.isArray(flower.color) ? flower.color.join(", ") : "N/A"}</td>
            <td>${flower.available}</td>
            <td>${flower.price.toFixed(2)}</td>
            `;
          flowersList.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching flowers:", error);
      flowersList.innerHTML = `
        <tr>
          <td colspan="10" class="text-center text-danger">Error loading flowers.</td>
        </tr>`;
    });
};

  // Fetch categories and populate the multiple select dropdown
  const fetchCategories = () => {
    fetch("https://flowers-world-two.vercel.app/categories/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch categories");
        return response.json();
      })
      .then((data) => {
        const categorySelect = document.getElementById("flowerCategory");
        categorySelect.innerHTML = ""; // Clear previous options
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.slug; // Use slug as the value
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  // Fetch colors and populate the multiple select dropdown
  const fetchColor = () => {
    fetch("https://flowers-world-two.vercel.app/colors/")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch colors");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const colorSelect = document.getElementById("flowerColor");
        colorSelect.innerHTML = ""; // Clear previous options
        data.forEach((color) => {
          const option = document.createElement("option");
          option.value = color.slug; // Use slug as the value
          option.textContent = color.name;
          colorSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };


  fetchCategories();
  fetchColor();

  document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("user_id"); 
    
    fetch(`https://flowers-world-two.vercel.app/users/${userId}/`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        return response.json();
      })
      .then((userData) => {
        const flowerOwnerInput = document.getElementById("flowerOwner");
        flowerOwnerInput.value = userData.username ;
      })
      .catch((error) => {
        console.error(error);
        // alert("Failed to retrieve user details.");
      });
  
    
  });
  
  const handleAddFlower = async (event) => {
    event.preventDefault();
  
    const formMessage = document.getElementById("form-message");
    formMessage.innerHTML = "";
  
    
  
    // Collect input values
    const owner = document.getElementById("flowerOwner").value.trim();
    const title = document.getElementById("flowerTitle").value.trim();
    const content = document.getElementById("flowerContent").value.trim();
    const image = document.getElementById("flowerImage").files[0];
    const category = Array.from(
      document.getElementById("flowerCategory").selectedOptions
    ).map((option) => option.value);
    const color = Array.from(
      document.getElementById("flowerColor").selectedOptions
    ).map((option) => option.value);
    const available = parseInt(
      document.getElementById("flowerAvailable").value.trim()
    );
    const price = parseFloat(
      document.getElementById("flowerPrice").value.trim()
    );
  
    // Validate required fields
    if (
      !owner||
      !title ||
      !content ||
      !image ||
      !category.length ||
      !color.length ||
      isNaN(available) ||
      isNaN(price) ||
      available < 0 ||
      price < 0
    ) {
      alert("All fields are required, and values must be valid.");
      return;
    }
  
    try {
      // Display loading state
      formMessage.innerHTML = `<div class="alert alert-info">Uploading flower...</div>`;
  
      // Upload image to imgbb
      const imgbbAPIKey = "6b0c007afbf8da08520a75fb493991aa"; // Replace with your actual API key
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", image);
  
      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: imgbbFormData,
        }
      );
  
      if (!imgbbResponse.ok) {
        throw new Error("Failed to upload image. Please try again.");
      }
  
      const imgbbData = await imgbbResponse.json();
      const imageUrl = imgbbData.data.url;
  
      // Prepare flower data (user is automatically set by the backend)
      const flowerData = {
        FlowerMalik: owner,
        title: title,
        content: content,
        image: imageUrl,
        category: category,
        color: color,
        available: available,
        price: price,
      };
      console.log(flowerData);
  
      // Send flower data to your backend
      const response = await fetch(
        "https://flowers-world-two.vercel.app/flowers/list/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(flowerData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add flower.");
      }
  
      // Handle success
      alert("Flower added successfully!");
      document.getElementById("flower_form").reset();
      fetchFlowers(); // Refresh the table or data display
      formMessage.innerHTML = `<div class="alert alert-success">Flower added successfully!</div>`;
    } catch (error) {
      console.error("Error adding flower:", error.message);
      formMessage.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
  };
  
  
  
  
  // Initial fetch to populate the table
  fetchFlowers();


