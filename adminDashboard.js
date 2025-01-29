
async function fetchFlowerCount() {
    try {
      // Fetch the data from the server
      const response = await fetch('https://flowers-world.onrender.com/flowers/list/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();

      // Extract the total flower count from the "count" field
      const flowerCount = data.count;

    //   console.log('Total Flower Count:', flowerCount);

      // Update the flower count in the HTML
      document.getElementById('flowerCount').textContent = flowerCount;
    } catch (error) {
      console.error('Error fetching flower data:', error);
      document.getElementById('flowerCount').textContent = 'Error loading data';
    }
  }

  // Call the function to fetch and display the flower count
  fetchFlowerCount();



  async function fetchOrderCount() {
  try {
    const response = await fetch('https://flowers-world.onrender.com/orders/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const orders = await response.json();
    let pendingCount = 0;
    let processingCount = 0;
    let rejectedCount = 0;
    let completedCount = 0;
    let order_types_onlin = 0;
    let order_types_offline = 0;

    orders.forEach(order => {
      if (order.order_status === 'Pending') {
        pendingCount++;
      } else if (order.order_status === 'Processing') {
        processingCount++;
      } else if (order.order_status === 'Rejected') {
        rejectedCount++;
      } else if (order.order_status === 'Completed') {
        completedCount++;
      
      }
      if (order.order_types === 'Online') {
        order_types_onlin++;
      } else if(order.order_types === 'Offline'){
        order_types_offline++;
      }
    });

    const orderCount = orders.length;

    // Safely update DOM elements only if they exist
    const orderCountElem = document.getElementById('orderCount');
    const pendingCountElem = document.getElementById('pendingCount');
    const processingCountElem = document.getElementById('processingCount');
    const rejectedCountElem = document.getElementById('rejectedCount');
    const completedCountElem = document.getElementById('completedCount');
    const order_types_onlinElem = document.getElementById('onlineCount');
    const order_types_offlineElem = document.getElementById('offlineCount');

    if (orderCountElem) orderCountElem.textContent = orderCount;
    if (pendingCountElem) pendingCountElem.textContent = pendingCount;
    if (processingCountElem) processingCountElem.textContent = processingCount;
    if (rejectedCountElem) rejectedCountElem.textContent = rejectedCount;
    if (completedCountElem) completedCountElem.textContent = completedCount;
    if (order_types_onlinElem) order_types_onlinElem.textContent = order_types_onlin;
    if (order_types_offlineElem) order_types_offlineElem.textContent = order_types_offline;

  } catch (error) {
    console.error('Error fetching order data:', error);

    // Fallback for error display
    const orderCountElem = document.getElementById('orderCount');
    const pendingCountElem = document.getElementById('pendingCount');
    const processingCountElem = document.getElementById('processingCount');
    const rejectedCountElem = document.getElementById('rejectedCount');
    const completedCountElem = document.getElementById('completedCount');
    const order_types_onlinElem = document.getElementById('onlineCount');
    const order_types_offlineElem = document.getElementById('offlineCount');

    if (orderCountElem) orderCountElem.textContent = 'Error loading data';
    if (pendingCountElem) pendingCountElem.textContent = 'Error';
    if (processingCountElem) processingCountElem.textContent = 'Error';
    if (rejectedCountElem) rejectedCountElem.textContent = 'Error';
    if (completedCountElem) completedCountElem.textContent = 'Error';
    if (order_types_onlinElem) order_types_onlinElem.textContent = 'Error';
    if (order_types_offlineElem) order_types_offlineElem.textContent = 'Error';
  }
}

document.addEventListener('DOMContentLoaded', fetchOrderCount);


async function fetchBuyerCount() {
    try {
      // Fetch the data from the server
      const response = await fetch('https://flowers-world.onrender.com/buyers/list/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response as JSON
      const buyers = await response.json();
  
      // Get the total buyer count
      const buyerCount = buyers.length;
      console.log('Total Buyer Count:', buyerCount);
  
      // Update the buyer count in the HTML
      const buyerCountElem = document.getElementById('buyerCount');
      if (buyerCountElem) {
        buyerCountElem.textContent = buyerCount;
      }
    } catch (error) {
      console.error('Error fetching buyer data:', error);
  
      // Fallback for error display
      const buyerCountElem = document.getElementById('buyerCount');
      if (buyerCountElem) {
        buyerCountElem.textContent = 'Error loading data';
      }
    }
  }
  
  // Call the function to fetch and display the buyer count
  document.addEventListener('DOMContentLoaded', fetchBuyerCount);

  async function fetchUserCount() {
    try {
      // Fetch the data from the server
      const response = await fetch('https://flowers-world.onrender.com/users/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response as JSON
      const users = await response.json();
  
      // Get the total user count
      const userCount = users.length;
      console.log('Total User Count:', userCount);
  
      // Update the user count in the HTML
      const userCountElem = document.getElementById('userCount');
      if (userCountElem) {
        userCountElem.textContent = userCount;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
  
      // Fallback for error display
      const userCountElem = document.getElementById('userCount');
      if (userCountElem) {
        userCountElem.textContent = 'Error loading data';
      }
    }
  }
  
  // Call the function to fetch and display the user count
  document.addEventListener('DOMContentLoaded', fetchUserCount);

  async function fetchCounts() {
    try {
      // Fetch category data
      const categoryResponse = await fetch('https://flowers-world.onrender.com/categories/');
      if (!categoryResponse.ok) {
        throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
      }
      const categories = await categoryResponse.json();
      const categoryCount = categories.length;
      
      // Fetch color data
      const colorResponse = await fetch('https://flowers-world.onrender.com/colors/');
      if (!colorResponse.ok) {
        throw new Error(`HTTP error! Status: ${colorResponse.status}`);
      }
      const colors = await colorResponse.json();
      const colorCount = colors.length;
  
      // Fetch review data
      const reviewResponse = await fetch('https://flowers-world.onrender.com/flowers/reviews/');
      if (!reviewResponse.ok) {
        throw new Error(`HTTP error! Status: ${reviewResponse.status}`);
      }
      const reviews = await reviewResponse.json();
      const reviewCount = reviews.length;
  
      // Log the counts to the console
      console.log('Total Category Count:', categoryCount);
      console.log('Total Color Count:', colorCount);
      console.log('Total Review Count:', reviewCount);
  
      // Update the counts in the HTML
      document.getElementById('categoryCount').textContent = categoryCount;
      document.getElementById('colorCount').textContent = colorCount;
      document.getElementById('reviewCount').textContent = reviewCount;
  
    } catch (error) {
      console.error('Error fetching data:', error);
  
      // Fallback for error display
      document.getElementById('categoryCount').textContent = 'Error loading data';
      document.getElementById('colorCount').textContent = 'Error loading data';
      document.getElementById('reviewCount').textContent = 'Error loading data';
    }
  }
  
  // Call the function to fetch and display the counts
  document.addEventListener('DOMContentLoaded', fetchCounts);
  
  async function fetchServiceAndContactCounts() {
    try {
      // Fetch service data
      const serviceResponse = await fetch('https://flowers-world.onrender.com/services/');
      if (!serviceResponse.ok) {
        throw new Error(`HTTP error! Status: ${serviceResponse.status}`);
      }
      const services = await serviceResponse.json();
      const serviceCount = services.length;
      
      // Fetch contact form data
      const contactResponse = await fetch('https://flowers-world.onrender.com/contact_us/');
      if (!contactResponse.ok) {
        throw new Error(`HTTP error! Status: ${contactResponse.status}`);
      }
      const contactForms = await contactResponse.json();
      const contactFormCount = contactForms.length;
  
      // Log the counts to the console
      console.log('Total Service Count:', serviceCount);
      console.log('Total Contact Form Count:', contactFormCount);
  
      // Update the counts in the HTML
      document.getElementById('serviceCount').textContent = serviceCount;
      document.getElementById('contactFormCount').textContent = contactFormCount;
  
    } catch (error) {
      console.error('Error fetching data:', error);
  
      // Fallback for error display
      document.getElementById('serviceCount').textContent = 'Error loading data';
      document.getElementById('contactFormCount').textContent = 'Error loading data';
    }
  }
  
  // Call the function to fetch and display the counts
  document.addEventListener('DOMContentLoaded', fetchServiceAndContactCounts);
  