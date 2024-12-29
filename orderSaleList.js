

// const loadAllOrder = (filterStatus = null) => {
//     fetch(`https://flowers-world.onrender.com/orders/`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         const parent = document.getElementById("table-body");
//         parent.innerHTML = ""; // Clear existing table rows
  
//         const filteredData = filterStatus
//           ? data.filter((item) => item.order_status === filterStatus)
//           : data;
  
//         if (filteredData.length === 0) {
//           parent.innerHTML = `<tr><td colspan="15">No orders found.</td></tr>`;
//           return;
//         }
  
//         filteredData.forEach((item) => {
//           const tr = document.createElement("tr");
//           tr.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.buyer}</td>
//             <td>${item.flower}</td>
//             <td>
//               ${(() => {
//                 const statusClasses = {
//                   Online: "btn btn-warning",
//                   Offline: "btn btn-secondary",
//                 };
//                 return item.order_types in statusClasses
//                   ? `<button class="${statusClasses[item.order_types]}">${item.order_types}</button>`
//                   : "";
//               })()}
//             </td>
//             <td>
//               ${(() => {
//                 const statusClasses = {
//                   Pending: "btn btn-warning",
//                   Processing: "btn btn-info",
//                   Completed: "btn btn-success",
//                   Rejected: "btn btn-danger",
//                 };
//                 return item.order_status in statusClasses
//                   ? `<button class="${statusClasses[item.order_status]}">${item.order_status}</button>`
//                   : "";
//               })()}
//             </td>
//             <td>
//               ${
//                 item.order_status === "Pending"
//                   ? "🅿️"
//                   : item.order_status === "Processing"
//                   ? "🔄"
//                   : item.order_status === "Completed"
//                   ? "✅"
//                   : item.order_status === "Rejected"
//                   ? "❌"
//                   : ""
//               }
//             </td>
//             <td>${item.quantity}</td>
//             <td>${item.mobile_no}</td>
//             <td>
//               ${
//                 item.order_date
//                   ? (() => {
//                       const date = new Date(item.order_date);
//                       const day = String(date.getUTCDate()).padStart(2, "0");
//                       const month = String(date.getUTCMonth() + 1).padStart(2, "0");
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
//                       const month = String(date.getUTCMonth() + 1).padStart(2, "0");
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
//                   : `<button class="btn btn-success">Final Order paid</button>`
//               }
//             </td>
//           `;
//           parent.appendChild(tr);
//         });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         document.getElementById("table-body").innerHTML = `<tr><td colspan="15">Failed to load orders.</td></tr>`;
//       });
//   };
  
//   const handleStatusFilter = () => {
//     const filterStatus = document.getElementById("status-filter").value; // Get selected status
//     loadAllOrder(filterStatus === "All" ? null : filterStatus); // Reload data with filter
//   };
  
//   // Load all orders on page load
//   loadAllOrder();
const loadAllOrder = (filterStatus = null) => {
    fetch(`https://flowers-world.onrender.com/orders/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((orders) => {
        const parent = document.getElementById("table-body");
        parent.innerHTML = ""; // Clear existing table rows
  
        // Filter orders based on status, if a filter is applied
        const filteredOrders = filterStatus
          ? orders.filter((item) => item.order_status === filterStatus)
          : orders;
  
        if (filteredOrders.length === 0) {
          parent.innerHTML = `<tr><td colspan="15">No orders found.</td></tr>`;
          return;
        }
  
        // Fetch all flowers
        fetch(`https://flowers-world.onrender.com/flowers/list/`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch flowers");
            }
            return res.json();
          })
          .then((flowerData) => {
            const flowers = flowerData.results;
  
            filteredOrders.forEach((order) => {
              // Find the flower matching the order
              const flower = flowers.find(
                (f) => f.title === order.flower 
              );
  
              if (flower) {
                // Create and append the row only if the flower belongs to the logged-in user
                const tr = document.createElement("tr");
                tr.innerHTML = `
                  <td>${order.id}</td>
                  <td>${order.buyer}</td>
                  <td>${order.flower}</td>
                  <td>
                    ${(() => {
                      const statusClasses = {
                        Online: "btn btn-warning",
                        Offline: "btn btn-secondary",
                      };
                      return order.order_types in statusClasses
                        ? `<button class="${statusClasses[order.order_types]}">${order.order_types}</button>`
                        : "";
                    })()}
                  </td>
                  <td>
                    ${(() => {
                      const statusClasses = {
                        Pending: "btn btn-warning",
                        Processing: "btn btn-info",
                        Completed: "btn btn-success",
                        Rejected: "btn btn-danger",
                      };
                      return order.order_status in statusClasses
                        ? `<button class="${statusClasses[order.order_status]}">${order.order_status}</button>`
                        : "";
                    })()}
                  </td>
                  <td>
                    ${
                      order.order_status === "Pending"
                        ? "🅿️"
                        : order.order_status === "Processing"
                        ? "🔄"
                        : order.order_status === "Completed"
                        ? "✅"
                        : order.order_status === "Rejected"
                        ? "❌"
                        : ""
                    }
                  </td>
                  <td>${order.quantity}</td>
                  <td>${order.mobile_no}</td>
                  <td>
                    ${
                      order.order_date
                        ? (() => {
                            const date = new Date(order.order_date);
                            const day = String(date.getUTCDate()).padStart(2, "0");
                            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
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
                      order.delivery_date
                        ? (() => {
                            const date = new Date(order.delivery_date);
                            const day = String(date.getUTCDate()).padStart(2, "0");
                            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                            const year = date.getUTCFullYear();
                            return `${day}-${month}-${year}`;
                          })()
                        : "N/A"
                    }
                  </td>
                  <td>${order.delivery_address}</td>
                  <td>${order.price} $</td>
                  <td>${order.total_price} $</td>
                  <td>
                    ${
                      JSON.parse(localStorage.getItem("order_ids") || "[]").includes(order.id)
                        ? `<button class="btn btn-info">In Customer's Cart not paid</button>`
                        : `<button class="btn btn-success">Final Order paid</button>`
                    }
                  </td>
                `;
                parent.appendChild(tr);
              }
            });
  
            // Display "No orders found" if no rows are added
            if (parent.innerHTML === "") {
              parent.innerHTML = `<tr><td colspan="15">No orders found for your flowers.</td></tr>`;
            }
          })
          .catch((error) => {
            console.error("Error fetching flowers:", error);
            parent.innerHTML = `<tr><td colspan="15">Failed to load orders.</td></tr>`;
          });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        document.getElementById("table-body").innerHTML = `<tr><td colspan="15">Failed to load orders.</td></tr>`;
      });
  };
  
  // Filter orders by status
  const handleStatusFilter = () => {
    const filterStatus = document.getElementById("status-filter").value; // Get selected status
    loadAllOrder(filterStatus === "All" ? null : filterStatus); // Reload data with filter
  };
  
  // Load all orders on page load
  loadAllOrder();
  