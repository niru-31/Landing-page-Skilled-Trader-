// ============================================
// STOCK MASTERY WEBINAR — REGISTRATION SYSTEM
// ============================================

// 🔴 REPLACE WITH YOUR NEW GOOGLE APPS SCRIPT WEB APP URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbybjLFdGcngExd3E9YjLkO1LrAvBZsygWO4PSqCsa9AXhS0Hmh8wrn4PF57eC1DIYJ-/exec";

function handleRegister() {
  // Get form values
  const name = document.getElementById('inp-name').value.trim();
  const email = document.getElementById('inp-email').value.trim();
  const phone = document.getElementById('inp-phone').value.trim();
  const courseSelect = document.getElementById('inp-course');
  const course = courseSelect.value;

  // VALIDATION
  if (!name) {
    alert("Please enter your full name");
    document.getElementById('inp-name').focus();
    return;
  }

  if (!email) {
    alert("Please enter your email address");
    document.getElementById('inp-email').focus();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    document.getElementById('inp-email').focus();
    return;
  }

  if (!phone) {
    alert("Please enter your WhatsApp number");
    document.getElementById('inp-phone').focus();
    return;
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    alert("Please enter a valid phone number (at least 10 digits)");
    document.getElementById('inp-phone').focus();
    return;
  }

  if (!course) {
    alert("Please select your current year / course");
    document.getElementById('inp-course').focus();
    return;
  }

  // SHOW LOADING STATE
  const btn = document.querySelector('.cta-btn');
  const originalBtnText = btn ? btn.innerHTML : "Register My Free Seat →";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "Registering... ⏳";
    btn.style.opacity = "0.7";
    btn.style.cursor = "not-allowed";
  }

  // Disable inputs during submission
  const inputs = document.querySelectorAll('#form-wrap input, #form-wrap select');
  inputs.forEach(input => input.disabled = true);

  // Prepare data as JSON string
  const payload = {
    name: name,
    email: email,
    phone: phone,
    course: course
  };

  // SEND DATA TO GOOGLE SHEETS
  // Using text/plain to avoid CORS preflight issues
  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("Server response:", data);
    
    if (data.status === "success") {
      // SUCCESS — Hide form, show success state
      document.getElementById('form-wrap').style.display = 'none';
      document.getElementById('success-state').style.display = 'block';
      
      // Show popup
      document.getElementById("popup").classList.add("active");
      
      // Scroll to success message
      document.getElementById('success-state').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    } else {
      throw new Error(data.message || "Server error");
    }
  })
  .catch((err) => {
    console.error("Registration error:", err);
    alert("Oops! Something went wrong: " ); //+ err.message);
    
    // Re-enable everything
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }
    inputs.forEach(input => input.disabled = false);
  });
}

// CLOSE POPUP
function closePopup() {
  document.getElementById("popup").classList.remove("active");
}

// Close popup on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    closePopup();
  }
});

// Close popup on clicking outside
document.getElementById("popup").addEventListener('click', function(e) {
  if (e.target === this) {
    closePopup();
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
