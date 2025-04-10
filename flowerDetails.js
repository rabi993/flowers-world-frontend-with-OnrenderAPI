const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("flowerId");
  
  fetch(`https://flowers-world-two.vercel.app/flowers/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));

  fetch(`https://flowers-world-two.vercel.app/flowers/reviews/?flower_id=${param}`)
    .then((res) => res.json())
    .then((data) => flowerReview(data));
};

const flowerReview = async (reviews) => {
  const parent = document.getElementById("flower-details-review");

  for (const review of reviews) {
    try {
      // Fetch user data
      const buyerResponse = await fetch(`https://flowers-world-two.vercel.app/users/${review.reviewer}`);
      const userData = await buyerResponse.json();
      const username = userData.username;
      const fullName = `${userData.first_name || "admin"} ${userData.last_name || "islam"}`;

      // Fetch the complete user list
      const userResponse = await fetch(`https://flowers-world-two.vercel.app/buyers/list/`);
      const buyersData = await userResponse.json();
      const buyerData = buyersData.find((buyer) => buyer.user === username);
      if (!buyerData) {
        console.error(`Buyer with username ${username} not found.`);
        continue;
      }
      const image = buyerData.image || "./Images/man.jpg";

      // Fetch flower information
      const flowerResponse = await fetch(`https://flowers-world-two.vercel.app/flowers/list/${review.flower}`);
      const flowerData = await flowerResponse.json();
      const flowerName = flowerData.title;

      // Create and append the review card
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `
        <img src="${image}" alt="Reviewer Image" />
        <h6>${fullName}</h6>
        <small>Flower: ${flowerName}</small></br>
        <small>${review.body.slice(0, 30)}</small>
        <h6>${review.rating}</h6>
      `;
      parent.appendChild(div);
    } catch (error) {
      console.error("Error processing review:", error);
    }
  }
};

const displayDetails = (flower) => {
  console.log(flower);
  const parent = document.getElementById("flower-details");
  const div = document.createElement("div");
  div.classList.add("flower-details-container", "row" ,"py-5", "gap-5","d-flex","justify-content-center");
  div.innerHTML = `
    <div class="flower-img img-fluid col-md-4 col-lg-4 obtni">
      <img src=${flower.image} alt="" />
    </div>
    <div class="doc-info col-md-4 col-lg-4  px-4 ">
      <h4>${flower?.title}</h4>
      ${flower?.category?.map((item) => {
        return `<b class=" "> Category: <span class="text-danger">${item}</span></b>`;
      })}
      <h6>Available : ${flower?.available}</h6>
      <h6>Saler : ${flower?.FlowerMalik}</h6>
      <p>
      ${flower?.content}
      </p>
      
      <h6>Price : ${flower?.price} $</h6>
      <p>
      ${flower?.color?.map((item) => {
        return `<b class=" rounded ">${item} </b>`;
      })}
      </p>
      <button
      type="button"
      class="btn btc text-white"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      id="buyNowBtn" onclick="openOrderModal()"
      >
      Buy Now
      </button>
      <button  class="btn btc text-white"data-bs-toggle="modal" data-bs-target="#exampleModal1">Write Review</button>
    </div>
    `;
  parent.appendChild(div);
};

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("user_id");
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  if (!userId || !flowerId) {
    // alert("Missing user or flower information.");
    return;
  }

  // Fetch and fill the reviewer's name
  fetch(`https://flowers-world-two.vercel.app/users/${userId}/`) // Replace with your actual user API endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      return response.json();
    })
    .then((userData) => {
      const reviewerNameInput = document.getElementById("reviewerName");
      reviewerNameInput.value = userData.first_name || "Guest";
    })
    .catch((error) => {
      console.error(error);
      // alert("Failed to retrieve user details.");
    });

  // Fetch and fill the flower's name
  fetch(`https://flowers-world-two.vercel.app/flowers/${flowerId}/`) 
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch flower details");
      }
      return response.json();
    })
    .then((flowerData) => {
      const flowerNameInput = document.getElementById("flowerName");
      flowerNameInput.value = flowerData.title || "Unknown Flower";
    })
    .catch((error) => {
      console.error(error);
      // alert("Failed to retrieve flower details.");
    });
});

const handleReviewSubmission = (event) => {
  event.preventDefault(); // Prevent form refresh

  const userId = localStorage.getItem("user_id");
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  if (!userId || !flowerId) {
    alert("Missing user or flower information.");
    return;
  }

  // Gather form data
  const reviewBody = document.getElementById("reviewBody").value;
  const reviewRating = document.getElementById("reviewRating").value;

  const reviewData = {
    reviewer: userId, // Use user ID for backend submission
    flower: flowerId, // Use flower ID for backend submission
    body: reviewBody,
    rating: reviewRating,
  };

  // Submit the review
  fetch("https://flowers-world-two.vercel.app/flowers/reviews/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      return response.json();
    })
    .then((data) => {
      alert("Review submitted successfully!");

      // Optionally reload reviews section
      const reviewList = document.getElementById("flower-details-review");
      reviewList.innerHTML = ""; // Clear existing reviews
      fetch(`https://flowers-world-two.vercel.app/flowers/reviews/?flower_id=${flowerId}`)
        .then((res) => res.json())
        .then((data) => flowerReview(data)); // Update the reviews display
    })
    .catch((error) => {
      console.error(error);
      alert("Error submitting review. Please try again later.");
    });
};

getparams();



let flowerPrice = 0; // To store the flower's price

// Fetch the flower price when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const flowerId = new URLSearchParams(window.location.search).get("flowerId");

  if (flowerId) {
    fetch(`https://flowers-world-two.vercel.app/flowers/${flowerId}/`)
      .then((res) => res.json())
      .then((data) => {
        flowerPrice = data.price; // Store the flower price
        document.getElementById("price").value = flowerPrice.toFixed(2); // Display price
      })
      .catch((err) => {
        console.error("Failed to fetch flower details:", err);
      });
  }
});

// Update total price when quantity changes
document.getElementById("quantity").addEventListener("input", () => {
  const quantity = parseInt(document.getElementById("quantity").value) || 0;
  const totalPrice = flowerPrice * quantity;

  // Update total price in the form
  document.getElementById("total_price").value = totalPrice.toFixed(2);
});


const submitOrderForm = (event) => {
  event.preventDefault(); // Prevent the form from reloading the page


  const submitBtn = document.getElementById("submitOrder");
  submitBtn.disabled = true;
  submitBtn.innerText = "Placing...";

  const flowerId = new URLSearchParams(window.location.search).get("flowerId");
  const buyerId = localStorage.getItem("buyer_id");

  if (!flowerId || !buyerId) {
    alert("Missing flower or buyer information.");
    submitBtn.disabled = false;
    submitBtn.innerText = "Place Order";
    return;
  }

  const quantity = document.getElementById("quantity").value;
  const deliveryAddress = document.getElementById("delivery_address").value;
  const mobileNo = document.getElementById("mobile_no").value;
  const deliveryDate = document.getElementById("delivery_date").value;
  const orderType = document.getElementById("order_types").value;
  // Calculate the total price
  const totalPrice = flowerPrice * quantity;

  const orderData = {
    flower_id: flowerId,
    buyer_id: buyerId,
    quantity: parseInt(quantity),
    price: flowerPrice, // Add the flower price
    total_price: totalPrice, // Add the total price
    delivery_address: deliveryAddress,
    mobile_no: mobileNo,
    delivery_date: deliveryDate,
    order_types: orderType,
    order_status: "Pending",
    cancel: false,
  };

  console.log("Order Data:", orderData);

  // Send the data to the API
  fetch(`https://flowers-world-two.vercel.app/orders/?flower_id=${flowerId}&buyer_id=${buyerId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
      return response.json();
    })
    .then((data) => {
      // document.getElementById("exampleModal").style.display = "none"; // Close modal
      console.log("Order Response:", data);


      const orderId = data.id; // Assuming the response contains an `id` field for the order
      let orderIds = JSON.parse(localStorage.getItem("order_ids")) || []; // Get the existing array or initialize a new one
      orderIds.push(orderId); // Add the new order_id
      localStorage.setItem("order_ids", JSON.stringify(orderIds)); // Save back to localStorage
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
      modal.hide();
      alert("Order placed successfully!");
      location.reload();
    })
    
};
