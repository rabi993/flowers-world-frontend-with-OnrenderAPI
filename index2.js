location.reload();
// Check if the user is logged in
if (localStorage.getItem("buyer_id")) {
  // Show Logout and Profile links
  document.querySelector(".logout-menu").classList.remove("d-none");
  document.querySelector(".dash-menu").classList.remove("d-none");
  // document.querySelector(".aut_menu").classList.remove("d-none");
  document.querySelector(".aut_menu1").classList.remove("d-none");
  // document.querySelector(".aut_menu2").classList.remove("d-none");

  // Hide Login and Registration links
  document.querySelector(".login-menu").classList.add("d-none");
  document.querySelector(".registration-menu").classList.add("d-none");
} else {
  // Show Login and Registration links
  document.querySelector(".login-menu").classList.remove("d-none");
  document.querySelector(".registration-menu").classList.remove("d-none");

  // Hide Logout and Profile links
  document.querySelector(".logout-menu").classList.add("d-none");
  document.querySelector(".dash-menu").classList.add("d-none");
  // document.querySelector(".aut_menu").classList.add("d-none");
  document.querySelector(".aut_menu1").classList.add("d-none");
  // document.querySelector(".aut_menu2").classList.add("d-none");
}
  
document.addEventListener('DOMContentLoaded', () => {
  const buyerId = localStorage.getItem('buyer_id');
  const profileIcon = document.getElementById('profile_icon');
  const profileIcon2 = document.getElementById('profile_icon2');

  if (buyerId) {
    fetch(`https://flowers-world-two.vercel.app/buyers/list/${buyerId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.image) {
          // Update the profile image to the one fetched from the API
          profileIcon2.src = data.image;
          profileIcon2.style.display = 'inline'; // Show the new image
          profileIcon.style.display = 'none';   // Hide the default image
        }
      })
      .catch(error => {
        console.error('Error fetching buyer data:', error);
      });
  }
});


      
    