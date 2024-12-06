const darkMode = document.querySelector('.dark-mode');


darkMode.addEventListener('click', () => {
document.body.classList.toggle('dark-mode-variables');
darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})


// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select all buttons with the "paynow" class
    const payNowButtons = document.querySelectorAll(".paynow");

    // Add a click event listener to each button
    payNowButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            // Prevent default action
            event.preventDefault();

            // Get the data from the clicked button's attributes
            const href = button.getAttribute("data-href");
            const id = button.getAttribute("data-id");

            // Find the modal and its form elements
            const modal = document.getElementById("paynow");
            const form = modal.querySelector("form");

            // Populate the form's hidden input fields with the button's data
            form.action = href;
            form.querySelector('input[name="id"]').value = id;

            // Display the modal using Bootstrap's modal JavaScript API
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        });
    });
});