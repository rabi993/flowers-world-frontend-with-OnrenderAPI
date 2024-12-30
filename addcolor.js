
const handleAddColor = (event) => {
  event.preventDefault(); 

  // Gather form data
  const colorBody = document.getElementById("colorBody").value.trim();

  if (!colorBody) {
    alert("Color name cannot be empty.");
    return;
  }

  const slug = colorBody.toLowerCase().replace(/\s+/g, "-"); // Generate slug
  const colorData = {
    name: colorBody,
    slug: slug, // Include slug in the request
  };

  // Submit the color
  fetch("https://flowers-world.onrender.com/colors/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(colorData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error("Server error:", errorData);
          throw new Error(errorData.detail || "Failed to submit color.");
        });
      }
      return response.json();
    })
    .then(() => {
      alert("Color submitted successfully!");
      document.getElementById("colorBody").value = ""; 
      fetchColors(); // Refresh the color list
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(`Error submitting color: ${error.message}`);
    });
};


const fetchColors = () => {
  fetch("https://flowers-world.onrender.com/colors/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch colors.");
      }
      return response.json();
    })
    .then((colors) => {
      const colorTableBody = document.getElementById("color-table-body");
      colorTableBody.innerHTML = ""; // Clear existing rows

      if (colors.length === 0) {
        const row = colorTableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 2;
        cell.textContent = "No colors available.";
        cell.classList.add("text-center");
      } else {
        colors.forEach((color) => {
          const row = colorTableBody.insertRow();

          // Color column
          const colorCell = row.insertCell(0);
          colorCell.textContent = color.name;

          // Action column
          const actionCell = row.insertCell(1);
          actionCell.innerHTML = `
            <button class="btn btn-warning mx-1" onclick="handleEditColor('${color.id}', '${color.name}')">Edit</button>
            <button class="btn btn-danger mx-1" onclick="handleDeleteColor('${color.id}')">Delete</button>
          `;
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching colors:", error.message);
      const colorTableBody = document.getElementById("color-table-body");
      colorTableBody.innerHTML = `<tr><td colspan="2" class="text-center">Failed to load colors.</td></tr>`;
    });
};

// Handle color edit
const handleEditColor = (id, currentName) => {
  const newName = prompt("Edit color name:", currentName);
  if (!newName || newName.trim() === "") {
    alert("Color name cannot be empty.");
    return;
  }

  const slug = newName.toLowerCase().replace(/\s+/g, "-"); // Generate slug
  const colorData = { name: newName, slug };

  fetch(`https://flowers-world.onrender.com/colors/${id}/`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(colorData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error("Server error:", errorData);
          throw new Error(errorData.detail || "Failed to update color.");
        });
      }
      return response.json();
    })
    .then(() => {
      alert("Color updated successfully!");
      fetchColors(); // Refresh the color list
    })
    .catch((error) => {
      console.error("Error updating color:", error.message);
      alert(`Error updating color: ${error.message}`);
    });
};

const handleDeleteColor = (id) => {
  if (!confirm("Are you sure you want to delete this color?")) {
    return;
  }

  fetch(`https://flowers-world.onrender.com/colors/${id}/`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete color.");
      }
      alert("Color deleted successfully!");
      fetchColors(); 
    })
    .catch((error) => {
      console.error("Error deleting color:", error.message);
      alert(`Error deleting color: ${error.message}`);
    });
};


document.addEventListener("DOMContentLoaded", () => {
  fetchColors();
});
