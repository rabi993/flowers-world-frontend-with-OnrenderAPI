

const getValue = (id) => {
    return document.getElementById(id).value;
  };
  
  const handlecontact = (event) => {
    event.preventDefault(); // Prevent form default submission behavior
    
    const name = getValue("name");
    const phone = getValue("phone");
    const content = getValue("content");
  
    if (!name || !phone || !content) {
      document.getElementById("error").innerText = "All fields are required!";
      return;
    }
  
    const info = { name, phone, content };
  
    fetch("https://flowers-world-unkt.onrender.com/contact_us/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit the form. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle the server's response (e.g., success message)
        alert("Contact form submitted successfully!");
        document.querySelector("form").reset(); // Reset form fields
        document.getElementById("error").innerText = ""; // Clear error message
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("error").innerText =
          "An error occurred. Please try again.";
      });
  };
  