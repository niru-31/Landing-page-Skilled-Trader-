function handleRegister() {

  const name = document.getElementById('inp-name').value.trim();
  const email = document.getElementById('inp-email').value.trim();
  const phone = document.getElementById('inp-phone').value.trim();
  const course = document.getElementById('inp-course').value;

  // VALIDATION

  if (!name || !email || !phone || !course) {
    alert("Please fill all fields");
    return;
  }

  // SEND DATA

  fetch(
    "https://script.google.com/macros/s/AKfycbx8YeVRYVN3ayJWZGJF0j5c6g5cj9N5Nm8tgKZzajw7bisPbY-Z0ItzYIUFYVmERie41A/exec",
    {
      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      body: new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        course: course
      })

    }
  )

  .then(() => {

    // FORM HIDE
    document.getElementById('form-wrap').style.display = 'none';

    // SUCCESS STATE
    document.getElementById('success-state').style.display = 'block';

    // POPUP SHOW
    document.getElementById("popup").classList.add("active");

  })

  .catch((err) => {

    console.log(err);

    alert("Submission Failed");

  });

}


// CLOSE POPUP

function closePopup() {

  document.getElementById("popup").classList.remove("active");

}