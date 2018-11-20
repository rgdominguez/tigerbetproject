'use strict';
document.addEventListener('DOMContentLoaded', function(argument) {

    /*FORMULARIO DE CONTACTO*/
    let btn_enviarcomentario = document.getElementById('send-form');

    if(btn_enviarcomentario != null){
        btn_enviarcomentario.addEventListener('click', (ev)=>{
            ev.preventDefault();

            FORM.init(document.forms[3].elements);

            }, true);
    }

    /*POPUP*/
    POPUP.iniciar('loginpopup');
}, true);