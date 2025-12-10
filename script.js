"use strict";

let allItems = [];

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("service");

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

    /*
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews
      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["name"]; // here we are getting column values,,, here we are using the Field ID to fecth the name property
        let description = data.records[i].fields["description"];
        let image = data.records[i].fields["image"];
        let alt = data.records[i].fields["alt"];

        newHtml += `
        <section class="cardsChart">
          <div class="card">
          <img src="${image}" class="card-img-top" alt="${alt}" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
              ${description}
            </p>
            <a href="index.html?id=${data.records[i].id}" class="btn btn-primary">More Info</a>
          </div>
        </div>
      </section>
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
    */
    .then((data) => {
      console.log(data);

      // 🎯 SAVE Airtable data into allItems for filtering later
      allItems = data.records.map((record) => ({
        id: record.id,
        name: record.fields["name"],
        description: record.fields["description"],
        image: record.fields["image"] || "",
        servicesOffered: record.fields["servicesOffered"],
        ages: record.fields["ages"], // array
        days: record.fields["days"], // array
        location: record.fields["location"], // in-person / online
      }));

      renderItems(allItems);
    });
}
function renderItems(items) {
  const container = document.getElementById("service");
  container.innerHTML = "";

  let html = "";
  //<a href="index.html?id=${item.id}" class="btn btn-primary">More Info</a>
  items.forEach((item) => {
    html += `
      <section class="cardsChart">
        <div class="card lift">
          <img src="${item.image}" class="card-img-top" alt="${item.alt}" />
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            
            <button class="btn btn-primary" onclick="getOneRecord('${item.id}')">More Info</button>

          </div>
        </div>
      </section>
    `;
  });

  container.innerHTML = html;
}

//
//string interpolation w the backtick. subsitute w ${}.

function hidePageSections() {
  //this does not work...
  //const hero = document.getElementById("hero-image");
  const filters = document.getElementById("filter-bar");

  //if (hero) hero.style.display = "none";
  if (filters) filters.style.display = "none";
}

async function getOneRecord(id) {
  hidePageSections();
  let getResultElement = document.getElementById("service"); //returns html element object. service is my ID name...
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patwYPMVbfZ6KtqFr.88b5fccc3404d05f5eb094ee392b6b484aa088a09a7113df9c856d2928369720`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appJoz0hlIKKwFPOk/Table%201/${id}`,
    options
  ) /*
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let image = data.fields["image"];
      let name = data.fields["name"];
      let servicesOffered = data.fields["servicesOffered"];
      let ages = data.fields["ages"];
      let days = data.fields["days"];
      let description = data.fields["description"];
      let afterFive = data.fields["afterFive"];
      let location = data.fields["location"]; //in person or online format
      let address = data.fields["address"];
      let website = data.fields["website"];
      let phone = data.fields["phone"];
      let email = data.fields["email"];
      let hours = data.fields["hours"];
      let map = data.fields["map"]; //yet to be used, not a field in airtable yet

      let newHtml = `
        <div class="card list mb-3">
        <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
     ${
       image
         ? `<img class="img-fluid back ms-4" alt="${name}" src="${image[0].url}">`
         : ``
     }
    </div>
    <div class="col-md-6 d-flex justify-content-center align-items-center desc">
      <div class="card-body">
        <h5 class="card-title bar">${name}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text"><small>${servicesOffered}</small></p>
        <p class="card-text"><small>${address}</small></p>
        <a href="${map}" target="_blank"><button type="button" class="btn btn-primary btn-sm">Get Directions</button></a>
      </div>
    </div>
  </div>
</div>

<div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center ">
    ${image ? `<img class="img-fluid front" alt="${name}" src="${image}">` : ``}
       </div>
       <div class="col-md-6 d-flex justify-content-center align-items-center">
       <div class="card-body">
       <div class="card-group hours mx-auto">    
  <div class="card list hours shift">
    <div class="card-body">
      <h4 class="card-title">🕔 Hours</h4>
      <p class="card-text">${hours}</p>
      
    </div>
  </div>
  <div class="card list hours">
    <div class="card-body">
      <h4 class="card-title">Age groups served</h4>
      <p class="card-text">${ages}</p>
     
    </div>
  </div>
</div>
<div class="moves">
<table class="table misc">
    <tbody>
    <tr>
      <th scope="row misc">Days Open</th>
      <td class="card-text">${days}</td>
    </tr>
    <tr>
      <th scope="row misc">Open after 5pm?</th>
      <td>${afterFive}</td>
    </tr>
    <tr>
      <th scope="row misc">Food Served</th>
      <td colspan="2">${location}</td>
    </tr>
     <tr>
      <th scope="row misc">Phone Number</th>
      <td colspan="2">${phone}</td>
    </tr>
    <tr>
      <th scope="row misc">Links</th>
      <td colspan="2"><a href="${website}" target="_blank"><button type="button" class="btn btn-primary btn-sm go">Website</button></a> </td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
</div>
</div>
      `;

      getResultElement.innerHTML = newHtml;
    });
}*/
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const image = data.fields["image"] || "";
      const name = data.fields["name"] || "";
      const description = data.fields["description"] || "";
      const servicesOffered = data.fields["servicesOffered"] || "";
      const ages = data.fields["ages"] || "";
      const days = data.fields["days"] || "";
      const afterFive = data.fields["afterFive"] || "";
      const location = data.fields["location"] || "";
      const address = data.fields["address"] || "";
      const website = data.fields["website"] || "";
      const phone = data.fields["phone"] || "";
      const hours = data.fields["hours"] || "";
      const map = data.fields["map"] || "#";

      const newHtml = `
        <div class="container">
          <div class="row g-0">
            ${
              image
                ? `<div class="col-md-4"><img src="${image}" class="img-fluid rounded-start" alt="${name}"></div>`
                : ""
            }
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">${name}</h3>
                <p class="card-text">${description}</p>
                <p class="card-text"><strong>Services Offered:</strong> ${servicesOffered}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="container">
          <div class="row g-0">
            <div class="container">
              <div class="card-body">
                <h4>Location & Directions</h4>
                <p><strong>Address:</strong> ${address}</p>
                <a href="${map}" target="_blank" class="btn btn-primary btn-sm">Get Directions</a>
              </div>
            </div>
            <div class="container">
              <div class="card-body">
                <h4>Schedule & Details</h4>
                <p><strong>Hours:</strong> ${hours}</p>
                <p><strong>Age Groups Served:</strong> ${ages}</p>
                <p><strong>Days Open:</strong> ${days}</p>
                <p><strong>Open after 5pm:</strong> ${afterFive}</p>
                <p><strong>Format:</strong> ${location}</p>
              </div>
            </div>
            <div class="container">
              <div class="card-body">
                <h4>Contact & Links</h4>
                <p><strong>Phone:</strong> ${phone}</p>
                ${
                  website
                    ? `<a href="${website}" target="_blank" class="btn btn-primary btn-sm">Website</a>`
                    : ""
                }
              </div>

            </div>

          </div>
        </div>


        <div class="container">
          <button class="btn btn-secondary" onclick="getAllRecords()">Back to List</button>
        </div>
      `;

      getResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
// ??^^??

//window = open browser window, location = address bar aka url, then search returns query string of url
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  //checks whether param length is a valid id?
  // call function to hide search bar
  //myFunction();
  // has at least ["?id=", "OUR ID"]
  // call function for the dropdown menu
  //dropdown();
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  // Call listener function to hide search bar for mobile devices
  //myNeighborhood(x);
  // call function for the dropdown menu
  //dropdown();
  getAllRecords(); // no id given, fetch summaries
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

//testing this out rn, trying to use this to filter my stuff.
document.getElementById("applyFilters").addEventListener("click", () => {
  // Get checked values from each group
  const services = [
    ...document.querySelectorAll(".filter-service:checked"),
  ].map((cb) => cb.value);
  const ages = [...document.querySelectorAll(".filter-age:checked")].map(
    (cb) => cb.value
  );
  const days = [...document.querySelectorAll(".filter-days:checked")].map(
    (cb) => cb.value
  );
  const formats = [...document.querySelectorAll(".filter-format:checked")].map(
    (cb) => cb.value
  );

  let filtered = allItems;

  // Services filter
  if (services.length) {
    filtered = filtered.filter(
      (item) =>
        item.servicesOffered &&
        item.servicesOffered.some((service) => services.includes(service))
    );
  }

  // Age group filter (item may have multiple age groups)
  /*
  if (ages.length) {
    filtered = filtered.filter(
      (item) =>
        //item.AgeGroup && item.AgeGroup.some((age) => ages.includes(ages))
        item.ages && item.ages.some((age) => ages.includes(age))
    );
  }
    */
  if (ages.length) {
    filtered = filtered.filter((item) =>
      item.ages.some((age) => ages.includes(age))
    );
  }

  // Days open filter (item may have multiple days)
  //THIS DOES NOT INCLUDE AFTERFIVE BTW!!
  if (days.length) {
    filtered = filtered.filter(
      (item) =>
        //item.DaysOpen && item.DaysOpen.some((day) => days.includes(days))
        item.days && item.days.some((day) => days.includes(day))
    );
  }

  // Format filter (simple string) in-person or online
  /*
  if (formats.length) {
    filtered = filtered.filter((item) => formats.includes(item.location));
  }
  if (formats.length) {
    filtered = filtered.filter(
      (item) => item.location && formats.includes(item.location)
    );
  }*/
  //this doesnt work...
  if (formats.length) {
    filtered = filtered.filter((item) =>
      formats.includes(item.location.trim())
    );
  }

  // Re-render results
  renderItems(filtered);
});
