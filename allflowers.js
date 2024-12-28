const loadFlowers = (search = "") => {
  const flowersContainer = document.getElementById("flowers");
  const spinner = document.getElementById("spinner");
  const noData = document.getElementById("nodata");

  flowersContainer.innerHTML = "";
  spinner.style.display = "block";
  noData.style.display = "none";

  const url = `https://flowers-world.onrender.com/flowers/list/?search=${search}`;
  console.log("Fetching data from:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.style.display = "none";
      if (data.results && data.results.length > 0) {
        displayFlowers(data.results);
      } else {
        noData.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching flowers:", error);
      spinner.style.display = "none";
      noData.style.display = "block";
    });
};


  
  const displayFlowers = (flowers) => {
    // Sort flowers array by id in descending order
    const sortedflowers = flowers.sort((a, b) => b.id - a.id);

    let newTagLimit = 5;

  
    const flowersContainer = document.getElementById("flowers");
    flowersContainer.innerHTML = ""; // Clear previous content if any
  
    sortedflowers.forEach((flower, index) => {
      const isNew = index < newTagLimit; 
      const div = document.createElement("div");
      div.classList.add("flower-card", "col-12", "col-md-6", "col-lg-4");
      div.innerHTML = `
        <img class="flow-img" src="${flower.image}" alt="${flower.title}" />
        
        
        
        <h4>${flower.title}</h4>
        <div>${flower.category.map((item) => `<button class="btn btn-info rounded btn-sm ">${item}</button>`).join("")}</div>
        <p style="margin: 0px; "><b>Available:</b> ${flower.available} Piece</p>
        <small style="color: grey; margin: 0px;font-size:10px;">${flower.content.slice(0, 50)}...</small>
        <p style="margin: 0px; "<b>Price:</b> ${flower.price}$</p>
        <div>${flower.color.map((item) => `<button  class="btn btn-secondary rounded btn-sm ">${item}</button>`).join("")}</div>
        
          <a style="text-decoration: none; " class="btn btn-success rounded  mt-1" href="flowerDetails.html?flowerId=${flower.id}">Details</a>
          <div>${isNew ? '<button class="btn btn-warning btn-sm ms-2 new">NEW</button>' : ''}</div>
        
      `;
      flowersContainer.appendChild(div);
    });
  };
  

  
  const loadCategory = () => {
    fetch("https://flowers-world.onrender.com/categories/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-cat");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `<button class="btn btn-info" onclick="loadFlowers('${item.name}')">${item.name}</button>`;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  const loadColor = () => {
    fetch("https://flowers-world.onrender.com/colors/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-color");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `<button class="btn btn-info" onclick="loadFlowers('${item.name}')">${item.name}</button>`;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };
  
  const handleSearch = () => {
    const value = document.getElementById("search").value.trim();
    loadFlowers(value);
  };
  
  // Load initial data on page load
  document.addEventListener("DOMContentLoaded", () => {
    loadFlowers();
    loadCategory();
    loadColor();
  });

