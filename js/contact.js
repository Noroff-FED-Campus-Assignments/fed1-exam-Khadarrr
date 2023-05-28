const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;

  if (!name.trim()) {
    displayValidationMessage("Enter your full name.");
    return;
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!email.match(emailRegex)) {
    displayValidationMessage("Enter a valid email address.");
    return;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phone.match(phoneRegex)) {
    displayValidationMessage("Enter a valid 10-digit phone number.");
    return;
  }

  if (subject.length < 15) {
    displayValidationMessage("Enter a subject with at least 15 characters.");
    return;
  }

  alert("Form submitted successfully!");
});

function displayValidationMessage(message) {
  const validationMessage = document.getElementById("validation-message");
  validationMessage.textContent = message;
  validationMessage.style.display = "block";
}
