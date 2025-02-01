


// const loadAllOrder3 = (filterStatus = null, fromDate = null, toDate = null, singleDate = null) => {
//   fetch(`https://flowers-world-unkt.onrender.com/orders/`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const parent = document.getElementById("table-body");
//       parent.innerHTML = ""; // Clear any existing rows before appending new ones
      
//       let filteredData = filterStatus
//         ? data.filter((item) => item.order_status === filterStatus)
//         : data;

//       // Filter by date range if provided
//       if (fromDate || toDate) {
//         const fromTimestamp = fromDate ? new Date(fromDate).getTime() : null;
//         const toTimestamp = toDate ? new Date(toDate).getTime() : null;

//         filteredData = filteredData.filter((item) => {
//           const orderDateTimestamp = item.order_date
//             ? new Date(item.order_date).getTime()
//             : null;

//           return (
//             (!fromTimestamp || orderDateTimestamp >= fromTimestamp) &&
//             (!toTimestamp || orderDateTimestamp <= toTimestamp)
//           );
//         });
//       }

//       // Filter by single date if provided
//       if (singleDate) {
//         const singleDateTimestamp = new Date(singleDate).setHours(0, 0, 0, 0); // Normalize single date to midnight
//         filteredData = filteredData.filter((item) => {
//           const orderDateTimestamp = item.order_date
//             ? new Date(item.order_date).setHours(0, 0, 0, 0)
//             : null;

//           return orderDateTimestamp === singleDateTimestamp;
//         });
//       }

//       if (filteredData.length === 0) {
//         parent.innerHTML = `<tr><td colspan="15">No orders found.</td></tr>`;
//         return;
//       }
      
//       filteredData.sort((a, b) => b.id - a.id);

//       filteredData.forEach((item) => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.buyer}</td>
//             <td>${item.flower}</td>
//             <td>${item.order_types}</td>
//             <td id="order-status-${item.id}">${item.order_status}</td>
//             <td>
//                 ${item.order_status == "Pending" ? "💤"
//                   : item.order_status == "Processing" ? "🔄"
//                   : item.order_status == "Completed" ? "✅"
//                   : item.order_status == "Rejected" ? "❌"
//                   : ""}
//             </td>
//             <td>${item.quantity}</td>
//             <td>${item.mobile_no}</td>
//             <td>
//               ${item.order_date
//                 ? (() => {
//                     const date = new Date(item.order_date);
//                     const day = String(date.getUTCDate()).padStart(2, "0");
//                     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//                     const year = date.getUTCFullYear();
//                     const hours = String(date.getUTCHours()).padStart(2, "0");
//                     const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//                     return `${day}-${month}-${year}#T${hours}:${minutes}`;
//                   })()
//                 : "N/A"}
//             </td>
//             <td>
//               ${item.delivery_date
//                 ? (() => {
//                     const date = new Date(item.delivery_date);
//                     const day = String(date.getUTCDate()).padStart(2, "0");
//                     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//                     const year = date.getUTCFullYear();
//                     return `${day}-${month}-${year}`;
//                   })()
//                 : "N/A"}
//             </td>
//             <td>${item.delivery_address}</td>
//             <td>${item.price} $</td>
//             <td>${item.total_price} $</td>
//             <td>
//               ${item.paid 
//                 ? `<button class="btn btn-success">Paid</button>` 
//                 : `<button class="btn btn-secondary">NoPay</button>`}
//             </td>
//             <td>
//               ${!item.paid
//                 ? `<button class="btn btn-info">In Customer's Cart (not paid)</button>
//                    <button class="btn btn-danger" onclick="deleteOrder(${item.id})">Delete</button>`
//                 : `<button class="btn btn-secondary btn-update" data-id="${item.id}" data-status="Pending">💤</button>
//                    <button class="btn btn-info btn-update" data-id="${item.id}" data-status="Processing">🔄</button>
//                    <button class="btn btn-success btn-update" data-id="${item.id}" data-status="Completed">✅</button>
//                    <button class="btn btn-secondary btn-update mx-3" data-id="${item.id}" data-status="Rejected">❌</button>
//                    <button class="btn btn-danger" onclick="deleteOrder(${item.id})">Delete</button>`}
//             </td>
//         `;
//         parent.appendChild(tr);
//       });

//       // Add click event listeners to status buttons
//       document.querySelectorAll(".btn-update").forEach((button) => {
//         button.addEventListener("click", (event) => {
//           const orderId = event.target.getAttribute("data-id");
//           const newStatus = event.target.getAttribute("data-status");

//           updateOrderStatus(orderId, newStatus);
//         });
//       });
//     });
// };

// // const handleStatusFilter3 = () => {
// //   const filterStatus = document.getElementById("status-filter").value; // Get selected status
// //   const fromDate = document.getElementById("from-date").value; // Get 'from' date
// //   const toDate = document.getElementById("to-date").value; // Get 'to' date
// //   const singleDate = document.getElementById("single-date").value; // Get single date

// //   loadAllOrder(
// //     filterStatus === "All" ? null : filterStatus,
// //     fromDate,
// //     toDate,
// //     singleDate
// //   ); // Reload data with filters
// // };
// const handleStatusFilter3 = () => {
//   const filterStatus = document.getElementById("status-filter").value; // Get selected status
//   const fromDate = document.getElementById("from-date").value; // Get 'from' date
//   const toDate = document.getElementById("to-date").value; // Get 'to' date
//   const singleDate = document.getElementById("single-date").value; // Get single date

//   if (singleDate) {
//     // If single date is provided, use it for both fromDate and toDate
//     loadAllOrder(filterStatus === "All" ? null : filterStatus,fromDate = null, toDate = null, singleDate);
//   } else {
//     // Use fromDate and toDate if no single date is provided
//     loadAllOrder(filterStatus === "All" ? null : filterStatus, fromDate, toDate, );
//   }
// };


const loadAllOrder = (filterStatus = null, fromDate = null, toDate = null) => {
  fetch(`https://flowers-world-unkt.onrender.com/orders/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const parent = document.getElementById("table-body");
      parent.innerHTML = ""; // Clear any existing rows before appending new ones
      
      let filteredData = filterStatus
        ? data.filter((item) => item.order_status === filterStatus)
        : data;

      // Filter by date range if provided
      if (fromDate || toDate) {
        const fromTimestamp = fromDate ? new Date(fromDate).getTime() : null;
        const toTimestamp = toDate ? new Date(toDate).getTime() : null;

        filteredData = filteredData.filter((item) => {
          const orderDateTimestamp = item.order_date
            ? new Date(item.order_date).getTime()
            : null;

          return (
            (!fromTimestamp || orderDateTimestamp >= fromTimestamp) &&
            (!toTimestamp || orderDateTimestamp <= toTimestamp)
          );
        });
      }

      if (filteredData.length === 0) {
        parent.innerHTML = `<tr><td colspan="15">No orders found.</td></tr>`;
        return;
      }
      
      filteredData.sort((a, b) => b.id - a.id);

      filteredData.forEach((item) => {
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.buyer}</td>
            <td>${item.flower}</td>
            <td>${item.order_types}</td>
            <td id="order-status-${item.id}">
              ${(() => {
                const statusClasses = {
                  Pending: "text-dark",
                  Processing: "text-dark",
                  Completed: "text-success",
                  Rejected: "text-danger",
                };
                return item.order_status in statusClasses
                  ? `<p class="${statusClasses[item.order_status]}">${item.order_status}</p>`
                  : "";
              })()}
            </td>
            
            <td>${item.quantity}</td>
            <td>${item.mobile_no}</td>
            <td>
              ${item.order_date
                ? (() => {
                    const date = new Date(item.order_date);
                    const day = String(date.getUTCDate()).padStart(2, "0");
                    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                    const year = date.getUTCFullYear();
                    const hours = String(date.getUTCHours()).padStart(2, "0");
                    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                    return `${day}-${month}-${year}#T${hours}:${minutes}`;
                  })()
                : "N/A"}
            </td>
            <td>
              ${item.delivery_date
                ? (() => {
                    const date = new Date(item.delivery_date);
                    const day = String(date.getUTCDate()).padStart(2, "0");
                    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                    const year = date.getUTCFullYear();
                    return `${day}-${month}-${year}`;
                  })()
                : "N/A"}
            </td>
            <td>${item.delivery_address}</td>
            
            <td>${item.total_price} $</td>
            <td>
              ${item.paid 
                ? `<p class="">Y</p>` 
                : `<p class="btn bg-danger">N</p>`}
            </td>
            
            <td id="order-actions-${item.id}">
              ${getActionButtons(item)}
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
  const fromDate = document.getElementById("from-date").value; // Get 'from' date
  const toDate = document.getElementById("to-date").value; // Get 'to' date

  loadAllOrder(filterStatus === "All" ? null : filterStatus, fromDate, toDate); // Reload data with filters
};
// Generate Action Buttons
const getActionButtons = (item) => {
  let buttons = "";

  if (item.order_status === "Rejected") {
    // Show delete button only
    buttons += `<button class="btn obtn" onclick="deleteOrder(${item.id})">🗑️</button>`;
  } 
  else if (item.order_status === "Pending") {
    // Show all buttons except "Pending"
    buttons += `
      <button class="btn obtn pr btn-update" data-id="${item.id}" data-status="Processing">🔄</button>
      <button class="btn obtn cp btn-update" data-id="${item.id}" data-status="Completed">✅</button>
      <button class="btn obtn btn-update mx-1" data-id="${item.id}" data-status="Rejected">❌</button>
      <button class="btn obtn" onclick="deleteOrder(${item.id})">🗑️</button>
    `;
  } 
  else if (item.order_status === "Processing") {
    // Show "Completed", "Rejected", and "Delete" buttons
    buttons += `
      <button class="btn obtn cp btn-update" data-id="${item.id}" data-status="Completed">✅</button>
      <button class="btn obtn btn-update mx-1" data-id="${item.id}" data-status="Rejected">❌</button>
      <button class="btn obtn" onclick="deleteOrder(${item.id})">🗑️</button>
    `;
  } 
  else if (item.order_status === "Completed") {
    // Show "Completed" button (styled green) and Delete button
    buttons += `
      <small class=" cp btn-update" style="color: green; font-size:10px;" disabled>Completed</small>
      <button class="btn obtn" onclick="deleteOrder(${item.id})">🗑️</button>
    `;
  }

  return buttons;
};


const updateOrderStatus = (orderId, newStatus) => {
  fetch(`https://flowers-world-unkt.onrender.com/orders/${orderId}/`, {
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
// Function to delete an order
const deleteOrder = (orderId) => {
  if (confirm(`Are you sure you want to delete Order #${orderId}?`)) {
    fetch(`https://flowers-world-unkt.onrender.com/orders/${orderId}/`, {
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

const loadAllOrder1 = (filterStatus = null) => {
  fetch(`https://flowers-world-unkt.onrender.com/orders/`)
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
                  ? `<button class="btn btn-info">In Customer's Cart (not paid)</button>
                    <button class="btn btn-danger" onclick="deleteOrder(${item.id})">Delete</button>
                    `
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
const handleStatusFilter1 = () => {
  const filterStatus = document.getElementById("status-filter").value; // Get selected status
  loadAllOrder(filterStatus === "All" ? null : filterStatus); // Reload data with filter
};








