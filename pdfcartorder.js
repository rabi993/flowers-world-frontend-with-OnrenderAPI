

const loadorder = () => {
  
  const buyer_id = localStorage.getItem("buyer_id");
  const orderIds = JSON.parse(localStorage.getItem("order_ids")) || []; // Get stored order IDs

  fetch(`https://flowers-world.onrender.com/orders/?buyer_id=${buyer_id}`)
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
        tr.innerHTML = `<td colspan="12" class="text-center bg-secondary">No items added to your cart.</td>`;
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
            <td>
              ${
                item.order_status === "Pending"
                  ? "🅿️"
                  : item.order_status === "Processing"
                  ? "🔄"
                  : item.order_status === "Completed"
                  ? "✅"
                  : item.order_status === "Rejected"
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
      
      if (totalWithVAT !== 0) {
        localStorage.setItem("totalWithVAT", totalWithVAT);

      }
      parent2.appendChild(div);
      
    })
    .catch((err) => {
      console.error("Failed to load orders:", err);
    });
    
};

loadorder();

