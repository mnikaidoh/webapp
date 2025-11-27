"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patwYPMVbfZ6KtqFr.88b5fccc3404d05f5eb094ee392b6b484aa088a09a7113df9c856d2928369720`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appJoz0hlIKKwFPOk/Table%201`,
    options
  )
    .then((response) => response.json()) //whatever server returns, convert to json
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      /*
      getResultElement.innerHTML = ""; // clear brews
      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["name"]; // here we are getting column values,,, here we are using the Field ID to fecth the name property
        let description = data.records[i].fields["description"];
        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          
          <a href="breweries.html?id=${data.records[i].id}">${
          logo
            ? `<img class="card-img-top rounded" alt="${name}" src="${logo[0].url}">`
            : ``
        }
          </a>
          <p hidden class="card-key">${name}</p>
          </div>
          </div>
        </div>
    
        
        `;
      }


      getResultElement.innerHTML = newHtml;*/
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getAllRecords();
  // Get the navbar collapse element
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Get all navbar links including the navbar-brand
  const navbarLinks = document.querySelectorAll(".my-nav a");

  // Add an event listener to each navbar link
  navbarLinks.forEach((navbarLink) =>
    navbarLink.addEventListener("click", (event) => {
      // When a navbar link is clicked, remove the "show" class from the navbar collapse element
      navbarCollapse.classList.remove("show");
      // Remove the "active" class from all navbar links
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("active");
      });
      // Add the "active" class to the clicked navbar link
      event.target.classList.add("active");
      // Stop the event from propagating to Bootstrap event handlers
      event.stopPropagation();
    })
  );

  // Add an event listener to the navbar toggle button to handle the click event
  document
    .querySelector(".navbar-toggler")
    .addEventListener("click", (event) => {
      // When the navbar toggle button is clicked, add the "show" class to the navbar collapse element
      navbarCollapse.classList.toggle("show");
      // Stop the event from propagating to the body event handler
      event.stopPropagation();
    });

  // Add an event listener to the body to handle the click event
  document.body.addEventListener("click", () => {
    // When the body is clicked, remove the "show" class from the navbar collapse element
    navbarCollapse.classList.remove("show");
  });
});
