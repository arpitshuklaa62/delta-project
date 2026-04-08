// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
//DEBUG FETCH
fetch("/listings", {
  headers: {
    "Accept": "application/json"
  }
})
  .then(res => res.text())
  .then(data => console.log("👉 RESPONSE:", data))
  .catch(err => console.log("ERROR:", err));