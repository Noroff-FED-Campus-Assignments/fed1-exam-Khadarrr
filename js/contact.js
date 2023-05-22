
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {

  event.preventDefault();

  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;

  
  if (!name.trim()) {
    alert("Enter your full name.");
    return;
  }


  const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!email.match(emailRegex)) {
    alert("Enter a valid email address.");
    return;
  }


  const phoneRegex = /^\d{10}$/;
if (!phone.match(phoneRegex)) {
  alert("Enter a valid 10-digit phone number.");
  return;
}


  const wordCount = subject.trim().split(/\s+/).length;
  if (wordCount < 2) {
    alert("Enter a subject with at least 15 words.");
    return;
  }

  
  alert("Form submitted successfully!");
});
