const loadReviews = async () => {
    try {
      const response = await fetch("https://flowers-world.onrender.com/flowers/reviews/");
      const reviews = await response.json();
      await displayReviews(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const displayReviews = async (reviews) => {
    const parent = document.getElementById("allreview-container");
    parent.innerHTML = ""; // Clear existing reviews if any

    // Process all reviews sequentially
    for (const review of reviews) {
      try {
        // Fetch buyer information
        const buyerResponse = await fetch(`https://flowers-world.onrender.com/users/${review.reviewer}`);
        const userData = await buyerResponse.json();
        const username = userData.username;
        const fullName = `${userData.first_name || "admin"} ${userData.last_name || "islam"}`;
        // Fetch the complete user list
        const userResponse = await fetch(`https://flowers-world.onrender.com/buyers/list/`);
        const buyersData = await userResponse.json();
        const buyerData = buyersData.find((buyer) => buyer.user === username);
        if (!buyerData) {
          throw new Error(`Buyer with username ${username} not found.`);
        }
        const image = buyerData.image || "./Images/man.jpg";
        // Fetch flower information
        const flowerResponse = await fetch(`https://flowers-world.onrender.com/flowers/list/${review.flower}`);
        const flowerData = await flowerResponse.json();
        const flowerName = flowerData.title;

        // Create and append review card
        const div = document.createElement("div");
        div.classList.add("allreview-card","col-md-3","col-lg-3");
        div.innerHTML = `
        <img src="${image}" alt="Reviewer Image" /> 
        <h6>${fullName}</h6> 
        <p >Flower Name: ${flowerName}</p> 
        <small style="margin-top:-10px;">${review.body.slice(0, 100)}</small>
        <h6>Rating: ${review.rating}</h6>
        `;
        parent.appendChild(div);
      } catch (error) {
        console.error("Error processing review:", error);
      }
    }
  };

  // Call the function to load reviews
  loadReviews();