
const fetchBuyers = () => {
    fetch("https://flowers-world-two.vercel.app/buyers/list/")
        .then((response) => response.json())
        .then((buyers) => {
            const buyersList = document.getElementById("buyers-list");
            buyersList.innerHTML = ""; 
            buyers.forEach((buyer) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${buyer.id}</td>
                    <td>${buyer.user}</td>
                    <td><img style="width:50px;height:50px;" class="img-fluid" src="${buyer.image ? buyer.image : 'https://via.placeholder.com/100'}" alt="Image" style="width: 100px; height: 100px;"></td>
                    <td>${buyer.mobile_no || 'N/A'}</td>
                    <td>${buyer.address}</td>
                    <td>
                        <button class="btn obtn" onclick="editBuyer(${buyer.id})">📝</button>
                        <button class="btn obtn" onclick="deleteBuyer(${buyer.id})">🗑️</button>
                    </td>
                `;
                buyersList.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching buyers:", error);
            alert("Failed to load buyers.");
        });
};

const handleAddOrUpdateBuyer = (event) => {
    event.preventDefault();
  
    const buyerId = document.getElementById("buyerId").value;
    const username = document.getElementById("username").value.trim();
    const mobileNo = document.getElementById("mobileNo").value.trim();
    const address = document.getElementById("address").value.trim();
    const image = document.getElementById("image").files[0];
  
    if (!username || !mobileNo || !address) {
      alert("All fields are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("user", username);
    formData.append("mobile_no", mobileNo);
    formData.append("address", address);
    if (image) formData.append("image", image);
  
    const method = buyerId ? "PUT" : "POST";
    const url = buyerId
      ? `https://flowers-world-two.vercel.app/buyers/list/${buyerId}/`
      : "https://flowers-world-two.vercel.app/buyers/list/";
  
    fetch(url, {
      method: method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(buyerId ? "Buyer updated successfully!" : "Buyer added successfully!");
        document.getElementById("buyer-form").reset();
        fetchBuyers(); // Refresh the buyers list
      })
      .catch((error) => {
        console.error("Error adding/updating buyer:", error);
        alert(`Error: ${error.message}`);
      });
  };
  


fetchBuyers();


const editBuyer = (buyerId) => {
    fetch(`https://flowers-world-two.vercel.app/buyers/list/${buyerId}/`)
      .then((response) => response.json())
      .then((buyer) => {
        document.getElementById("buyerId").value = buyer.id;
        document.getElementById("username").value = buyer.user;
        document.getElementById("mobileNo").value = buyer.mobile_no;
        document.getElementById("address").value = buyer.address;
        if (buyer.image) {
          document.getElementById("imagePreview").src = buyer.image;
        }
      })
      .catch((error) => {
        console.error("Error fetching buyer details:", error);
        alert("Failed to load buyer details.");
      });
  };
  
// Delete a buyer
const deleteBuyer = (buyerId) => {
    if (!confirm("Are you sure you want to delete this buyer?")) return;
  
    fetch(`https://flowers-world-two.vercel.app/buyers/list/${buyerId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete buyer.");
        }
        alert("Buyer deleted successfully!");
        fetchBuyers(); // Refresh the buyers list
      })
      .catch((error) => {
        console.error("Error deleting buyer:", error);
        alert("Failed to delete buyer.");
      });
  };
  