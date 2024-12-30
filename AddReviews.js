const fetchReviews = () => {
    fetch("https://flowers-world.onrender.com/flowers/reviews/")
        .then((response) => response.json())
        .then((reviews) => {
            const reviewsList = document.getElementById("reviews-list");
            reviewsList.innerHTML = ""; // Clear existing rows
            reviews.forEach((review) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${review.reviewer || "Anonymous"}</td>
                    <td>${review.flower}</td>
                    <td>${review.body}</td>
                    <td>${review.rating}</td>
                    <td>${new Date(review.created).toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteReview(${review.id})">Delete</button>
                    </td>
                `;
                reviewsList.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching reviews:", error);
            alert("Failed to load reviews.");
        });
};

const handleAddReview = (event) => {
    event.preventDefault();

    const flowerTitle = document.getElementById("flowerTitle").value.trim();
    const reviewBody = document.getElementById("reviewBody").value.trim();
    const reviewRating = document.getElementById("reviewRating").value;

    
    if (!flowerTitle || !reviewBody || !reviewRating) {
        alert("All fields are required.");
        return;
    }

    const reviewData = {
        flower: flowerTitle,
        body: reviewBody,
        rating: reviewRating,
    };

    fetch("https://flowers-world.onrender.com/flowers/reviews/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Review added successfully!");
            document.getElementById("review-form").reset();
            fetchReviews(); 
        })
        .catch((error) => {
            console.error("Error adding review:", error);
            alert(`Error: ${error.message}`);
        });
};

fetchReviews();

const deleteReview = (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    fetch(`https://flowers-world.onrender.com/flowers/reviews/${reviewId}/`, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete review");
            }
            alert("Review deleted successfully!");
            fetchReviews(); 
        })
        .catch((error) => {
            console.error("Error deleting review:", error);
            alert("Failed to delete review.");
        });
};
