document.querySelectorAll(".event").forEach(event => {
    const eventDetails = event.querySelector(".event-details");

    event.addEventListener("mouseenter", () => {
        eventDetails.style.display = "block";
    });

    event.addEventListener("mouseleave", () => {
        eventDetails.style.display = "none";
    });
});
