
const loadorder = () => {
  const buyer_id = localStorage.getItem("buyer_id");
  const orderIds = JSON.parse(localStorage.getItem("order_ids")) || []; // Get stored order IDs

  fetch(`https://flowers-world-unkt.onrender.com/orders/?buyer_id=${buyer_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("All Orders:", data);

      // Filter only the orders whose IDs are in the orderIds array
      const filteredOrders = data.filter((item) => orderIds.includes(item.id));

      console.log("Filtered Orders:", filteredOrders);

      const parent = document.getElementById("table-body1");
      parent.innerHTML = ""; // Clear the table body before adding rows

      if (filteredOrders.length === 0) {
        // Show a message if no orders are present
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="13" class="text-center">No items added to your cart.</td>`;
        parent.appendChild(tr);
      } else {
        filteredOrders.forEach((item) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.buyer}</td>
            <td>${item.flower}</td>
            <td>${item.order_types}</td>
            <td>${item.order_status}</td>
            
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
                ${
                  item.order_status === "Pending"
                    ? `
                    <button class="btn btn-warning reorder " data-id="${item.id}" data-quantity="${item.quantity}" data-flower="${item.flower}" >reorder</button>
                    <button class="btn btn-danger delete-btn" data-id="${item.id}" data-quantity="${item.quantity}" data-flower="${item.flower}">Delete</button>
                  `
                    : ""
                }
            </td>
            
          `;
          parent.appendChild(tr);
        });
      }

      // Display total amounts
      const parent1 = document.getElementById("totalamount");
      parent1.innerHTML = ""; // Clear the container
      let total = 0; // Declare the total variable outside the loop

      filteredOrders.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${item.flower} - ${item.quantity} - ${item.total_price} $</p>`;
        total += item.total_price;
        parent1.appendChild(div);
      });

      // Calculate and display the total with VAT
      const parent2 = document.getElementById("totalamountV");
      parent2.innerHTML = ""; // Clear the container
      const vat = total * 0.15; // Calculate 15% VAT
      const totalWithVAT = total + vat;

      const div = document.createElement("div");
      div.innerHTML = `<h4>Total amount + 15% VAT: ${totalWithVAT.toFixed(2)} $</h4>`;
      parent2.appendChild(div);
    })
    .catch((err) => {
      console.error("Failed to load orders:", err);
    });
};


document.addEventListener("click", (event) => {
  const target = event.target;

  // Handle Delete Button
  if (target.classList.contains("delete-btn")) {
    const orderId = target.dataset.id; // Order ID from the button's data attribute
    const flower = target.dataset.flower; // Flower name
    const quantity = parseInt(target.dataset.quantity); // Quantity as an integer

    if (!orderId || !flower || isNaN(quantity)) {
      console.error("Invalid data attributes for delete operation.");
      return;
    }

    console.log(`Deleting order: ID=${orderId}, Flower=${flower}, Quantity=${quantity}`);

    // Call delete API and update the available quantity
    fetch(`https://flowers-world-unkt.onrender.com/orders/${orderId}/`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          alert("Order deleted successfully!");

          // Remove order ID from localStorage
          let orderIds = JSON.parse(localStorage.getItem("order_ids")) || [];
          orderIds = orderIds.filter((id) => id !== parseInt(orderId)); // Remove the deleted order ID
          localStorage.setItem("order_ids", JSON.stringify(orderIds));

          
          // Reload the orders table
          loadorder();
        } else {
          alert("Failed to delete the order!");
          console.error("Delete API responded with an error.");
        }
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("An error occurred while deleting the order.");
      });
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  // Handle Reorder Button
  if (target.classList.contains("reorder")) {
    const orderId = target.dataset.id; // Order ID
    const flower = target.dataset.flower; // Flower name
    const quantity = parseInt(target.dataset.quantity);

    if (!orderId || !flower || isNaN(quantity)) {
      console.error("Invalid data attributes for reorder operation.");
      return;
    }

    console.log(`Reordering: ID=${orderId}, Flower=${flower}, Quantity=${quantity}`);

    // Delete the existing order
    fetch(`https://flowers-world-unkt.onrender.com/orders/${orderId}/`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete the order.");

        // Remove order ID from localStorage
        let orderIds = JSON.parse(localStorage.getItem("order_ids")) || [];
        orderIds = orderIds.filter((id) => id !== parseInt(orderId));
        localStorage.setItem("order_ids", JSON.stringify(orderIds));

        console.log("Order deleted, fetching flower list...");

        // Fetch flower details
        return fetch("https://flowers-world-unkt.onrender.com/flowers/list/");
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch flower list.");
        return res.json();
      })
      .then((response) => {
        // Ensure response contains a list (array) of flowers
        const flowers = Array.isArray(response) ? response : response.results || [];
        
        // Find flower by title
        const filteredFlower = flowers.find((f) => f.title === flower);

        if (filteredFlower) {
          const flower_id = filteredFlower.id;
          console.log(`Flower ID: ${flower_id}`);

          // Redirect to details page with query param
          window.location.href = `https://rabi993.github.io/flowers-world-frontend-with-OnrenderAPI/flowerDetails.html?flowerId=${flower_id}`;

          
        } else {
          throw new Error("Flower not found in the list.");
        }
      })
      .catch((err) => {
        console.error("Reorder failed:", err);
        alert("An error occurred while reordering.");
      });
  }
});


loadorder();


 
