const loadAllOrder = (filterStatus = null) => {
    fetch("https://flowers-world.onrender.com/orders/")
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
        fetch("https://flowers-world.onrender.com/flowers/list/")
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch flowers");
            }
            return res.json();
          })
          .then((flowerData) => {
            const flowers = flowerData.results;
  
            filteredOrders.forEach((order) => {
              const flower = flowers.find((f) => f.title === order.flower);
  
              if (flower && flower.FlowerMalik === localStorage.getItem("username")) {
                // Create and append the row only if the flower belongs to the logged-in user
                const tr = document.createElement("tr");
                tr.className = "winner__table";
                tr.innerHTML = `
                  <td>${order.id}</td>
                  <td>${order.buyer}</td>
                  <td>${order.flower}</td>
                  <td>
                    ${getButtonClass(order.order_types, {
                      Online: "text-dark",
                      Offline: "text-secondary",
                    })}
                  </td>
                  <td>
                    ${getButtonClass(order.order_status, {
                      Pending: "text-dark",
                      Processing: "text-dark",
                      Completed: "text-success",
                      Rejected: "text-danger",
                    })}
                  </td>
                  
                  <td>${order.quantity}</td>
                  <td>${order.mobile_no}</td>
                  <td>${formatDate(order.order_date, true)}</td>
                  <td>${formatDate(order.delivery_date)}</td>
                  <td>${order.delivery_address}</td>
                  <td>${order.price} $</td>
                  <td>${order.total_price} $</td>
                  <td>
                    ${
                      JSON.parse(localStorage.getItem("order_ids") || "[]").includes(order.id)
                        ? `<p class="text-dark">InCart noPaid</p>`
                        : `<p class="text-success">Paid</p>`
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
  
  // Utility: Get button class
  const getButtonClass = (key, classes) => {
    return classes[key] ? `<p class="${classes[key]}">${key}</p>` : "";
  };
  
  
  
  // Utility: Format dates
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    if (includeTime) {
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    return `${day}/${month}/${year}`;
  };
  
  // Filter orders by status
  const handleStatusFilter = () => {
    const filterStatus = document.getElementById("status-filter").value; // Get selected status
    loadAllOrder(filterStatus === "All" ? null : filterStatus); // Reload data with filter
  };
  
  // Load all orders on page load
  loadAllOrder();
  