document.addEventListener("DOMContentLoaded", () => {
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
