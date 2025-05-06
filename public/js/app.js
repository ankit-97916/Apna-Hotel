(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
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

  // bootstarp js code for form validation and styling

  // tax btn functionality   
  let taxBtn = document.querySelector("#switchCheckDefault");
  taxBtn.addEventListener("click", () => {
    let taxInfo =  document.querySelectorAll(".tax");
    taxInfo.forEach((tax) => {
    // tax.style.display =  "inline"
    if(tax.style.display != "inline"){
      tax.style.display =  "inline";
    }else{
      tax.style.display =  "none"
    }
    });
  });
