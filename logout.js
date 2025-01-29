
const orderdelete = () => {
  // Get order IDs from localStorage
  const orderIds = JSON.parse(localStorage.getItem("order_ids")) || [];

  if (orderIds.length === 0) {
    console.log("No orders to delete from the server.");
    return;
  }

  console.log(`Deleting orders: ${orderIds}`);

  // Loop through each order ID and delete the order from the server
  orderIds.forEach((orderId) => {
    fetch(`https://flowers-world.onrender.com/orders/${orderId}/`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          console.log(`Order ID ${orderId} deleted successfully.`);
        } else {
          console.error(`Failed to delete Order ID ${orderId}.`);
        }
      })
      .catch((err) => {
        console.error(`Error deleting Order ID ${orderId}:`, err);
      });
  });
};

// ==================== Logout Functionality ====================
const handlelogOut = () => {
  // Show confirmation prompt before logging out
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (!confirmLogout) {
    // If user cancels, do nothing and return
    console.log("Logout canceled.");
    return;
  }
  
  const token = localStorage.getItem("token");

  fetch("https://flowers-world.onrender.com/buyers/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Logout response:", data);

      // Call orderdelete to delete all orders in order_ids
      orderdelete();

      // Clear all localStorage items
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("buyer_id");
      localStorage.removeItem("username");
      localStorage.removeItem("order_ids");
      localStorage.removeItem("totalWithVAT");
      localStorage.removeItem("isPaid");

      console.log("LocalStorage cleared successfully.");

      // Redirect to login page
      window.location.href = "https://rabi993.github.io/flowers-world-frontend-with-OnrenderAPI/login.html"; // Redirect to the login page
    })
    .catch((err) => {
      console.error("Logout failed:", err);
      alert("An error occurred during logout.");
    });
};

// ==================== Attach Logout Event Listener ====================
document.getElementById("logout-btn").addEventListener("click", handlelogOut);
