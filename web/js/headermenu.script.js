document.addEventListener('DOMContentLoaded', function () {
    let url = window.location.pathname;
    let menuli = document.querySelectorAll('#menu li');
    for (let i =0; i<menuli.length; i++){
        if(url.indexOf(menuli[i].children[0].id) > -1){
            menuli[i].style.background = 'orange';
            return;
        }
    }

}, false);