// const loadAllOrder = () => {
  
//   fetch(
//     `https://flowers-world.onrender.com/orders/`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       data.forEach((item) => {
//         const parent = document.getElementById("table-body");
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.buyer}</td>
//             <td>${item.flower}</td>
//             <td>${item.order_types}</td>
//             <td>${item.order_status}</td>
//             <td>
//                 ${
//                   item.order_status == "Pending"
//                     ? "💤"
//                     : item.order_status == "Processing"
//                     ? "🔄"
//                     : item.order_status == "Completed"
//                     ? "✅"
//                     : item.order_status == "Rejected"
//                     ? "❌"
//                     : ""
//                 }
//             </td>

//             <td>${item.quantity}</td>
//             <td>${item.mobile_no}</td>
//             <td>
//               ${
//                 item.order_date
//                   ? (() => {
//                       const date = new Date(item.order_date);
//                       const day = String(date.getUTCDate()).padStart(2, "0");
//                       const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//                       const year = date.getUTCFullYear();
//                       const hours = String(date.getUTCHours()).padStart(2, "0");
//                       const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//                       return `${day}-${month}-${year}#T${hours}:${minutes}`;
//                     })()
//                   : "N/A"
//               }
//             </td>


//             <td>
//               ${
//                 item.delivery_date
//                   ? (() => {
//                       const date = new Date(item.delivery_date);
//                       const day = String(date.getUTCDate()).padStart(2, "0");
//                       const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
//                       const year = date.getUTCFullYear();
//                       return `${day}-${month}-${year}`;
//                     })()
//                   : "N/A"
//               }
//             </td>

//             <td>${item.delivery_address}</td>
//             <td>${item.price} $</td>
//             <td>${item.total_price} $</td>
//             <td>
//               ${
//                 JSON.parse(localStorage.getItem("order_ids") || "[]").includes(item.id)
//                   ? `<button class="btn btn-info">In Customer's Cart not paid </button>`
//                   : `<button class="btn btn-secondary">💸</button>
//                   <button class="btn btn-secondary btn-update" data-id="${item.id}" data-status="Pending">Pending</button>
//                     <button class="btn btn-info btn-update" data-id="${item.id}" data-status="Processing">Processing</button>
//                     <button class="btn btn-success btn-update" data-id="${item.id}" data-status="Completed">Completed</button>
//                     <button class="btn btn-danger btn-update mx-3" data-id="${item.id}" data-status="Rejected">Reject</button>`
//               }
//             </td>

//             `;
//         parent.appendChild(tr);
//       });
//     });
// };

// // Function to update the order status
// const updateOrderStatus = (orderId, newStatus) => {
//   fetch(`https://flowers-world.onrender.com/orders/${orderId}/`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ order_status: newStatus }),
//   })
//     .then((response) => {
//       if (!response.ok) throw new Error("Failed to update order status.");
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Order updated:", data);
//       // Update the order status in the table
//       const statusCell = document.getElementById(`order-status-${orderId}`);
//       statusCell.textContent = newStatus;
//       alert(`Order #${orderId} status updated to ${newStatus}.`);
//     })
//     .catch((error) => {
//       console.error("Error updating order status:", error.message);
//       alert(`Failed to update order status: ${error.message}`);
//     });
// };


// loadAllOrder();


const loadAllOrder = (filterStatus = null) => {
  fetch(`https://flowers-world.onrender.com/orders/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const parent = document.getElementById("table-body");
      parent.innerHTML = ""; // Clear any existing rows before appending new ones
      const filteredData = filterStatus
        ? data.filter((item) => item.order_status === filterStatus)
        : data;

      if (filteredData.length === 0) {
        parent.innerHTML = `<tr><td colspan="15">No orders found.</td></tr>`;
        return;
      }
      
      filteredData.sort((a, b) => b.id - a.id);

      filteredData.forEach((item) => {
        // console.log(item.paid );
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.buyer}</td>
            <td>${item.flower}</td>
            <td>${item.order_types}</td>
            <td id="order-status-${item.id}">${item.order_status}</td>
            <td>
                ${
                  item.order_status == "Pending"
                    ? "💤"
                    : item.order_status == "Processing"
                    ? "🔄"
                    : item.order_status == "Completed"
                    ? "✅"
                    : item.order_status == "Rejected"
                    ? "❌"
                    : ""
                }
            </td>
            <td>${item.quantity}</td>
            <td>${item.mobile_no}</td>
            <td>
              ${
                item.order_date
                  ? (() => {
                      const date = new Date(item.order_date);
                      const day = String(date.getUTCDate()).padStart(2, "0");
                      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
                      const year = date.getUTCFullYear();
                      const hours = String(date.getUTCHours()).padStart(2, "0");
                      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                      return `${day}-${month}-${year}#T${hours}:${minutes}`;
                    })()
                  : "N/A"
              }
            </td>
            <td>
              ${
                item.delivery_date
                  ? (() => {
                      const date = new Date(item.delivery_date);
                      const day = String(date.getUTCDate()).padStart(2, "0");
                      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
                      const year = date.getUTCFullYear();
                      return `${day}-${month}-${year}`;
                    })()
                  : "N/A"
              }
            </td>
            <td>${item.delivery_address}</td>
            <td>${item.price} $</td>
            <td>${item.total_price} $</td>
            <td>
              ${item.paid 
                ? `<button class="btn btn-success">Paid</button>` 
                : `<button class="btn btn-secondary">NoPay</button>`
              }
            </td>
            <td>
              ${
                !item.paid
                  ? `<button class="btn btn-info">In Customer's Cart (not paid)</button>`
                  : `
                    <button class="btn btn-secondary btn-update" data-id="${item.id}" data-status="Pending">💤</button>
                    <button class="btn btn-info btn-update" data-id="${item.id}" data-status="Processing">🔄</button>
                    <button class="btn btn-success btn-update" data-id="${item.id}" data-status="Completed">✅</button>
                    <button class="btn btn-secondary btn-update mx-3" data-id="${item.id}" data-status="Rejected">❌</button>
                    <button class="btn btn-danger" onclick="deleteOrder(${item.id})">Delete</button>
                  `
              }
            </td>

        `;
        parent.appendChild(tr);
      });

      // Add click event listeners to status buttons
      document.querySelectorAll(".btn-update").forEach((button) => {
        button.addEventListener("click", (event) => {
          const orderId = event.target.getAttribute("data-id");
          const newStatus = event.target.getAttribute("data-status");

          updateOrderStatus(orderId, newStatus);
        });
      });
    });
};
const handleStatusFilter = () => {
  const filterStatus = document.getElementById("status-filter").value; // Get selected status
  loadAllOrder(filterStatus === "All" ? null : filterStatus); // Reload data with filter
};

const updateOrderStatus = (orderId, newStatus) => {
  fetch(`https://flowers-world.onrender.com/orders/${orderId}/`, {
    method: "PATCH", // Use PATCH for partial updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order_status: newStatus }), // Only sending the field to update
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update order status.");
      return response.json();
    })
    .then((data) => {
      console.log("Order updated:", data);
      const statusCell = document.getElementById(`order-status-${orderId}`);
      statusCell.textContent = newStatus;
      alert(`Order #${orderId} status updated to ${newStatus}.`);
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating order status:", error.message);
      alert(`Failed to update order status: ${error.message}`);
    });
};



const updateOrderStatus2 = async (orderId, newStatus) => {
  try {
    const response = await fetch(`https://flowers-world.onrender.com/orders/${orderId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_status: newStatus }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error details:", errorDetails);
      throw new Error(errorDetails.detail || "Failed to update order status.");
    }

    const data = await response.json();
    console.log("Order updated:", data);

    // Update the order status in the table
    const statusCell = document.getElementById(`order-status-${orderId}`);
    if (statusCell) statusCell.textContent = newStatus;

    alert(`Order #${orderId} status updated to ${newStatus}.`);
    location.reload(); // Refresh the page to reflect changes
  } catch (error) {
    console.error("Error updating order status:", error.message);
    alert(`Failed to update order status: ${error.message}`);
  }
};

// Function to update the order status
const updateOrderStatus1 = (orderId, newStatus) => {
  fetch(`https://flowers-world.onrender.com/orders/${orderId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order_status: newStatus }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update order status.");
      return response.json();
    })
    .then((data) => {
      console.log("Order updated:", data);
      // Update the order status in the table
      const statusCell = document.getElementById(`order-status-${orderId}`);
      statusCell.textContent = newStatus;
      alert(`Order #${orderId} status updated to ${newStatus}.`);
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating order status:", error.message);
      alert(`Failed to update order status: ${error.message}`);
    });
};

// Function to delete an order
const deleteOrder = (orderId) => {
  if (confirm(`Are you sure you want to delete Order #${orderId}?`)) {
    fetch(`https://flowers-world.onrender.com/orders/${orderId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete order.");
        alert(`Order #${orderId} deleted successfully.`);
        loadAllOrder(); // Reload the table to reflect changes
      })
      .catch((error) => {
        console.error("Error deleting order:", error.message);
        alert(`Failed to delete order: ${error.message}`);
      });
  }
};
// Load all orders on page load
loadAllOrder();

