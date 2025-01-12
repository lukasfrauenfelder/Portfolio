document.querySelectorAll(".image-row img").forEach((image) => {
  // Create the title element
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = image.getAttribute("data-title"); // Set the title from data-title attribute
  console.log("halöle");
  // Append the title to the image container
  image.parentElement.appendChild(title);

  // Show title when the image is hovered
  image.addEventListener("mouseenter", () => {
    const rect = image.getBoundingClientRect();
    // Set the position of the title relative to the image
    title.style.position = "absolute"; // Ensure title is absolutely positioned
    title.style.top = `${rect.top + window.scrollY}px`; // Set top based on the image's top
    title.style.left = `${rect.left + window.scrollX - rect.width / 10}px`; // Set left based on the image's left
    // title.style.transform = "translate(-50%, -50%)";
    title.style.opacity = "1"; // Make title visible
  });

  // Hide title when the mouse leaves the image
  image.addEventListener("mouseleave", () => {
    title.style.opacity = "0"; // Hide title
  });
});
