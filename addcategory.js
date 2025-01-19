
const handleAddCategory = (event) => {
  event.preventDefault(); 

  // Gather form data
  const categoryBody = document.getElementById("categoryBody").value.trim();

  if (!categoryBody) {
    alert("Category name cannot be empty.");
    return;
  }
  const slug = categoryBody.toLowerCase().replace(/\s+/g, "-"); // Generate slug
  const categoryData = {
    name: categoryBody,
    slug: slug, // Include slug in the request
  };

  // Submit the category
  fetch("https://flowers-world.onrender.com/categories/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error("Server error:", errorData);
          throw new Error(errorData.detail || "Failed to submit category.");
        });
      }
      return response.json();
    })
    .then(() => {
      alert("Category submitted successfully!");
      document.getElementById("categoryBody").value = ""; 
      fetchCategories(); 
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(`Error submitting category: ${error.message}`);
    });
};

const fetchCategories = () => {
  fetch("https://flowers-world.onrender.com/categories/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      return response.json();
    })
    .then((categories) => {
      const categoryTableBody = document.getElementById("category-table-body");
      categoryTableBody.innerHTML = ""; 
      if (categories.length === 0) {
        const row = categoryTableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 2;
        cell.textContent = "No categories available.";
        cell.classList.add("text-center");
      } else {
        categories.forEach((category) => {
          const row = categoryTableBody.insertRow();

          
          const categoryCell = row.insertCell(0);
          categoryCell.textContent = category.name;

          
          const actionCell = row.insertCell(1);
          actionCell.innerHTML = `
            <button class="btn obtn  mx-1" onclick="handleEditCategory('${category.id}', '${category.name}')">📝</button>
            <button class="btn obtn mx-1" onclick="handleDeleteCategory('${category.id}')">🗑️</button>
          `;
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching categories:", error.message);
      const categoryTableBody = document.getElementById("category-table-body");
      categoryTableBody.innerHTML = `<tr><td colspan="2" class="text-center">Failed to load categories.</td></tr>`;
    });
};


const handleEditCategory = (id, currentName) => {
  const newName = prompt("Edit category name:", currentName);
  if (!newName || newName.trim() === "") {
    alert("Category name cannot be empty.");
    return;
  }

  const slug = newName.toLowerCase().replace(/\s+/g, "-"); 
  const categoryData = { name: newName, slug };

  fetch(`https://flowers-world.onrender.com/categories/${id}/`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error("Server error:", errorData);
          throw new Error(errorData.detail || "Failed to update category.");
        });
      }
      return response.json();
    })
    .then(() => {
      alert("Category updated successfully!");
      fetchCategories(); 
    })
    .catch((error) => {
      console.error("Error updating category:", error.message);
      alert(`Error updating category: ${error.message}`);
    });
};

const handleDeleteCategory = (id) => {
  if (!confirm("Are you sure you want to delete this category?")) {
    return;
  }

  fetch(`https://flowers-world.onrender.com/categories/${id}/`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete category.");
      }
      alert("Category deleted successfully!");
      fetchCategories(); 
    })
    .catch((error) => {
      console.error("Error deleting category:", error.message);
      alert(`Error deleting category: ${error.message}`);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
});
