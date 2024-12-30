
const fetchFlowers = () => {
    const flowersList = document.getElementById("flowers-list");
    flowersList.innerHTML = `<tr><td colspan="8" class="text-center">Loading flowers...</td></tr>`;
  
    fetch("https://flowers-world.onrender.com/flowers/list/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flowers.");
        }
        return response.json();
      })
      .then((data) => {
        const flowers = data.results;
        flowersList.innerHTML = ""; 
  
        if (flowers.length === 0) {
          flowersList.innerHTML = `
            <tr>
              <td colspan="8" class="text-center">No flowers available.</td>
            </tr>`;
        } else {
          flowers.forEach((flower) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${flower.id}</td>
              <td>${flower.title}</td>
              <td>${flower.FlowerMalik}</td>
              <td>${flower.content}</td>
              <td><img src="${flower.image}" alt="${flower.title}" style="width: 100px; height: 100px; object-fit: cover;"></td>
              <td>${flower.category.join(", ")}</td>
              <td>${flower.color.join(", ")}</td>
              <td>${flower.available}</td>
              <td>${flower.price.toFixed(2)}</td>
              <td>
                <div class ="d-flex ">
                  <button class="btn btn-info" onclick='handleEditFlower(${JSON.stringify(flower)})'>Edit</button>
                  <button class="btn btn-danger mx-3" onclick='handleDeleteFlower(${flower.id})'>Delete</button>
                </div>
              </td>
            `;
            flowersList.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching flowers:", error);
        flowersList.innerHTML = `
          <tr>
            <td colspan="8" class="text-center text-danger">Error loading flowers.</td>
          </tr>`;
      });
  };
  

  const fetchCategories = () => {
    fetch("https://flowers-world.onrender.com/categories/")
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
  
  const fetchColor = () => {
    fetch("https://flowers-world.onrender.com/colors/")
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
    
    fetch(`https://flowers-world.onrender.com/users/${userId}/`) 
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

    const owner = document.getElementById("flowerOwner").value.trim();
    const title = document.getElementById("flowerTitle").value.trim();
    const content = document.getElementById("flowerContent").value.trim();
    const image = document.getElementById("flowerImage").files[0];
    const category = Array.from(document.getElementById("flowerCategory").selectedOptions).map(option => option.value);
    const color = Array.from(document.getElementById("flowerColor").selectedOptions).map(option => option.value);
    const available = parseInt(document.getElementById("flowerAvailable").value.trim());
    const price = parseFloat(document.getElementById("flowerPrice").value.trim());
  
    if (!owner || !title || !content || !image || !category.length || !color.length || isNaN(available) || isNaN(price)) {
      alert("All fields are required.");
      return;
    }
  
    try {
      // Upload image to imgbb
      const imgbbAPIKey = "6b0c007afbf8da08520a75fb493991aa"; // Replace with your actual API key
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", image);
  
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: imgbbFormData,
      });
  
      if (!imgbbResponse.ok) {
        throw new Error("Failed to upload image to imgbb.");
      }
  
      const imgbbData = await imgbbResponse.json();
      const imageUrl = imgbbData.data.url;
  
      // Prepare form data
      const flowerData = {
        owner,
        title,
        content,
        image: imageUrl,
        category,
        color,
        available,
        price,
      };
  
      // Send flower data to your backend
      const response = await fetch("https://flowers-world.onrender.com/flowers/list/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flowerData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add flower.");
      }
  
      alert("Flower added successfully!");
      document.getElementById("flower_form").reset();
      fetchFlowers(); // Refresh the table
    } catch (error) {
      console.error("Error adding flower:", error.message);
      formMessage.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
  };
  
  
  // Initial fetch to populate the table
  fetchFlowers();


const handleEditFlower = (flower) => {
  document.getElementById("flowerTitle").value = flower.title;
  document.getElementById("flowerContent").value = flower.content;
  document.getElementById("flowerAvailable").value = flower.available;
  document.getElementById("flowerPrice").value = flower.price;

  const categorySelect = document.getElementById("flowerCategory");
  Array.from(categorySelect.options).forEach(option => {
    option.selected = flower.category.includes(option.value);
  });

  const colorSelect = document.getElementById("flowerColor");
  Array.from(colorSelect.options).forEach(option => {
    option.selected = flower.color.includes(option.value);
  });

  const flowerForm = document.getElementById("flower_form");
  flowerForm.onsubmit = async (event) => {
    event.preventDefault();

    try {
      const imgbbAPIKey = "6b0c007afbf8da08520a75fb493991aa"; 
      const fileInput = document.getElementById("flowerImage");
      let imageUrl = flower.image;

      if (fileInput.files.length > 0) {
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", fileInput.files[0]);

        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
          method: "POST",
          body: imgbbFormData,
        });

        if (!imgbbResponse.ok) {
          throw new Error("Failed to upload image to imgbb.");
        }

        const imgbbData = await imgbbResponse.json();
        imageUrl = imgbbData.data.url;
      }

      const updatedFlower = {
        title: flowerForm.elements["flowerTitle"].value,
        content: flowerForm.elements["flowerContent"].value,
        available: flowerForm.elements["flowerAvailable"].value,
        price: flowerForm.elements["flowerPrice"].value,
        image: imageUrl,
        category: Array.from(categorySelect.selectedOptions).map(option => option.value),
        color: Array.from(colorSelect.selectedOptions).map(option => option.value),
      };

      const response = await fetch(`https://flowers-world.onrender.com/flowers/list/${flower.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFlower),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update flower.");
      }

      alert("Flower updated successfully!");
      fetchFlowers(); // Refresh the list
    } catch (error) {
      console.error("Error updating flower:", error.message);
      alert(`Error updating flower: ${error.message}`);
    }
  };
};



  const handleDeleteFlower = (id) => {
    if (confirm("Are you sure you want to delete this flower?")) {
      fetch(`https://flowers-world.onrender.com/flowers/list/${id}/`, {
        method: "DELETE",
      })
        .then(response => {
          if (!response.ok) throw new Error("Failed to delete flower.");
          alert("Flower deleted successfully!");
          fetchFlowers(); // Refresh the table
        })
        .catch(error => {
          console.error("Error deleting flower:", error.message);
        });
    }
  };

  

  
