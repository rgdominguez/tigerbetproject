'use strict';
(function(d,w){
    document.addEventListener('DOMCon' +
        'tentLoaded', getPosicionHastaElTop, false);

    function getPosicionHastaElTop(){
        w.addEventListener("scroll", function(ev){
            let main = document.querySelector('main');
            let distanciaAlTOP = main.getBoundingClientRect().top;
            let menu = d.getElementById('menu-normal');

            if(distanciaAlTOP < -150){
                menu.classList.add('fixed-menu');
            }else{
                menu.classList.remove('fixed-menu');
            }
        }, true);
    }

}(document, window));