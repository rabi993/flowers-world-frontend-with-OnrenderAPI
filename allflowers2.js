const loadFlowerss = (search = "white") => {
  const flowersContainer = document.getElementById("flowerst");
  const spinner = document.getElementById("spinnerr");
  const noData = document.getElementById("nodataa");

  flowersContainer.innerHTML = "";
  spinner.style.display = "block";
  noData.style.display = "none";

  const url = `https://flowers-world-two.vercel.app/flowers/list/?search=${search}`;
  console.log("Fetching data from:", url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.style.display = "none";
      if (data.results && data.results.length > 0) {
        displayFlowerss(data.results);
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


  
  const displayFlowerss = (flowers) => {
    // Sort flowers array by id in descending order
    const sortedflowers = flowers.sort((a, b) => b.id - a.id);

    // let newTagLimit = 6;

  
    const flowersContainer = document.getElementById("flowerst");
    flowersContainer.innerHTML = ""; // Clear previous content if any
  
    sortedflowers.forEach((flower, index) => {
      // const isNew = index < newTagLimit; 
      const div = document.createElement("div");
      div.classList.add("allflower-cardx", "col-12", "col-md-2", "col-lg-2","boxshadow","pb-4");
      div.innerHTML = `
        <img class="allflow-imgx img-fluid " src="${flower.image}" alt="${flower.title}" />
        
        
        
        <h5 class="pt-3">${flower.title} ${flower.category.map((item) => `<small  style="color: #e07265;font-size:10px; " class="">${item}</small>`).join("")} <small style="margin: 0px;font-size:15px; "></small> </h5>
      
        
          <a style="text-decoration: none;" class="btn-sm btc px-2 py-1  text-white mt-1" href="flowerDetails.html?flowerId=${flower.id}">Details</a>
          
        
      `;
      flowersContainer.appendChild(div);
    });
  };
  

  
  const loadCategoryy = () => {
    fetch("https://flowers-world-two.vercel.app/categories/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-catt");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("div");
          li.classList.add("dropdown-item","col-lg-2","col-md-2","mx-2","align-items-center");
          li.style.cssText = `
            padding: 0px;
            background-image: url('Images/gft6.jpg');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            width: 200px;
            height:200px;
          `;
          li.innerHTML = `
          
            <div style="margin: 100px 10px 10px 10px;" class="bg-white   text-center"> 
              
              <button style="border:none; width:100%;" class=" py-2 text-center text-black " onclick="loadFlowerss('${item.name}')"><span class="fs-5" >${item.name}</span></button> 
            </div>
          `;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  const loadColorr = () => {
    fetch("https://flowers-world-two.vercel.app/colors/")
      .then((res) => res.json())
      .then((data) => {
        const parent = document.getElementById("drop-colorr");
        parent.innerHTML = ""; // Clear previous items
        data.forEach((item) => {
          const li = document.createElement("div");
          li.classList.add("dropdown-item","col-lg-2","col-md-2","mx-2","align-items-center");
          li.style.cssText = `
            border:2px solid gray;
            padding:5px;
            width:200px;
            margin-bottom:10px ;
          `;

          let bgColorStyle = "";
          if (item.name.toLowerCase() === "black") {
            bgColorStyle = "background-color: black; color: white; border:1px solid gray;";
          } else if (item.name.toLowerCase() === "white") {
            bgColorStyle = "background-color: white; color: black;border:1px solid gray;";
          } else if (item.name.toLowerCase() === "pink") {
            bgColorStyle = "background-color: #F7899C; color: white;border:1px solid gray;";
          } else if (item.name.toLowerCase() === "merun") {
            bgColorStyle = "background-color: #7C0000; color: white;border:1px solid gray;";
          } else if (item.name.toLowerCase() === "yellow") {
            bgColorStyle = "background-color: yellow; color: black;border:1px solid gray;";
          } else if (item.name.toLowerCase() === "green") {
            bgColorStyle = "background-color: green; color: white;border:1px solid gray;";
          } else if (item.name.toLowerCase() === "blue") {
            bgColorStyle = "background-color: blue; color: white;border:1px solid gray;";
          } else if (item.name.toLowerCase() === "red") {
            bgColorStyle = "background-color: red; color: white;border:1px solid gray;";
          } else{
            bgColorStyle = "background-color: white; color: black;border:1px solid gray;";
          }

          li.innerHTML = `
          <div style=" " class="bg-white   text-center"> 
              <button style="width:20%; ${bgColorStyle} " class="btn p-2 mb-2 ms-1 " onclick="loadFlowerss('${item.name}')"></button>
              <button style="border:none; width:75%;" class=" py-2 text-center text-black " onclick="loadFlowerss('${item.name}')"><span class="fs-5" >${item.name}</span></button> 
          </div>
          
          
          `;
          parent.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching colors:", error));
  };
  
  const handleSearchh = () => {
    const value = document.getElementById("searchh").value.trim();
    loadFlowerss(value);
  };
  
  // Load initial data on page load
  document.addEventListener("DOMContentLoaded", () => {
    loadFlowerss();
    loadCategoryy();
    loadColorr();
  });

  if (item.name === "black") {
    document.querySelector(".colorbutton").classList.add("text-danger");
} else if (item.name === "white") {
    document.querySelector(".colorbutton").classList.add("text-success");
}
