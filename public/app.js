window.onload = function () {

   const swiper = new Swiper('#swiper', {
      pagination: {
         el: '.swiper-pagination',
         clickable: true
      }, 
      loop: true,
      autoplay: {
         delay: 2700,
         disableOnInteraction: false
      },
      slidesPerGroup: 1,
      autoHeight: true,
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 700
   });

      function isChecked(checkbox){
         return checkbox.checked
      }

      function isEmpty(elem){
         return !(elem.length > 0)
      }


    const alertConfirmPassword = document.querySelector('#alertConfirmPassword')
    const inputPassword = document.querySelector('#password') 
    const inputConfirmPassword = document.querySelector('#confirm') 
    const btnSubmit = document.querySelector('button[data-role="submitConfirmingForm"]')
    const regCheckbox = document.querySelector('input[type = checkbox]')
    
    if(alertConfirmPassword && inputConfirmPassword && inputPassword){
       inputConfirmPassword.addEventListener('input', (e) => {
          alertConfirmPassword.removeAttribute('hidden')
          if (inputPassword.value === inputConfirmPassword.value && isChecked(regCheckbox)){
             alertConfirmPassword.setAttribute('hidden', true)
             btnSubmit.removeAttribute('disabled')
          } else {
             btnSubmit.setAttribute('disabled', true)
          }
       })
    
       inputPassword.addEventListener('input', (e) => {
          alertConfirmPassword.removeAttribute('hidden')
          if (inputPassword.value === inputConfirmPassword.value && isChecked(regCheckbox)){
             alertConfirmPassword.setAttribute('hidden', true)
             btnSubmit.removeAttribute('disabled')
          } else {
             btnSubmit.setAttribute('disabled', true)
          }
       })

       regCheckbox.addEventListener('change', (e) => {
         if (inputPassword.value === inputConfirmPassword.value && isChecked(regCheckbox) && !isEmpty(inputPassword.value)){
            btnSubmit.removeAttribute('disabled')
         } else {
            btnSubmit.setAttribute('disabled', true)
         }
      })
    
    }
    
    function addShowPassFunctional(field){
       field.addEventListener('click', e => {
          if (e.target.classList.contains('btn-show-pass')){
             const button = e.target
             const inputField = button.parentNode
             const input = inputField.children[0]
             
             if(input.attributes.type.nodeValue === 'password'){
                input.setAttribute('type', 'text')
                button.children[0].classList.add('clicked')
             } else {
                input.setAttribute('type', 'password')
                button.children[0].classList.remove('clicked')
             }
             
          }
       })
    } 
    const $register = document.querySelector('#register')
    const $login = document.querySelector('#login')
    const $newPassword = document.querySelector('#new-password')
    if($register){
       addShowPassFunctional($register)
    } 
    if($login){
       addShowPassFunctional($login)
    } else if($newPassword){
       
       addShowPassFunctional($newPassword)
    }
    
    const inputProfileAvatar = document.querySelector('.profile-form input[type=file]')
    const fileCheckSqure = document.querySelector('.file-field .fa-check-square-o')
    if (inputProfileAvatar) {
       inputProfileAvatar.addEventListener('change', e => {
          fileCheckSqure.style.display = 'block'
       })
    }
    
    
    

    //========== MATERIALIZE
    M.Tabs.init(document.querySelectorAll('.tabs'))
var elems = document.querySelectorAll('.sidenav');
var instances = M.Sidenav.init(elems);

var elem = document.querySelector('#side-out');
var instance = M.Sidenav.getInstance(elem);

 elem.addEventListener('click', (ev) => {
    instance.open();
 })
};
