'use strict';
(function(d, FORM){

    FORM.EMAILPATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email_validado = false;
    let campos_vacios = [];

    function enviarFormulario(params){
        let datos_form = {
            'nombre' : params[0],
            'email'  : params[1],
            'comentario' : params[2]
        };

        $.ajax({
            type: "POST",
            url: "/insertar-contacto",
            data: JSON.stringify(datos_form),
            dataType: "json",
            success: function(response) {
                getResponse(response);
            },
            error: function(e){
                console.log('erro' +
                    'r');
                gestionarErrores(e);
            }
        });
    }

    function gestionarErrores(e){
        alert('ERROR :: Que canteo !');
        console.log(e);
    }


    function getResponse(response){
        let info_container = document.querySelector('#contacto .form .result');
        let info = document.querySelector('#contacto .form .result p');
        info_container.style.opacity = 1;
        if(response.data && response.data == 'ok'){
            info_container.classList.add('success');
            info.innerHTML = 'Tu mensaje ha sido enviado correctamente';
            $('#contacto-nombre').val('')
            $('#contacto-email').val('')
            $('#contacto-comentarios').val('')
        }else{
            info_container.classList.add('error');
            info.innerHTML = 'Ha ocurrido un error al enviar tu mensaje.';
        }
    }

    function validarEmail(nodo) {
        nodo.nextElementSibling.innerHTML = '';
        if(!FORM.EMAILPATTERN.test(nodo.value.trim())){
            nodo.nextElementSibling.innerHTML = 'Introduce un email válido';
            email_validado = false;
            return;
        }
        email_validado = true;
    }

    function validarCamposVacios(elements){
        campos_vacios = [];
        for (let i = 0; i < elements.length; i++) {
            elements[i].nextElementSibling.innerHTML = '';
            if(elements[i].value.trim().length == 0){
                elements[i].nextElementSibling.innerHTML = 'El campo no puede quedar vacío';
                campos_vacios.push(false);
            }else{
                campos_vacios.push(true);
            }
        }
    }

    function evaluarFormulario(){
        let result = campos_vacios.reduce(function(res, elem){
            return res && elem;
        });
        return email_validado&&result;
    }

    function enviarComentario(inputs){
        let values = inputs.map(function(elem){
            return elem.value;
        });
        enviarFormulario(values);
    }

    FORM.init = function(formelements){
        let inputs = new Array();
        for (let i = 0; i < formelements.length; i++) {
            inputs.push(formelements[i]);
        }

        validarCamposVacios(inputs.slice(0,3));
        validarEmail(inputs[1]);
        if(evaluarFormulario()){
            enviarComentario(inputs.slice(0,3));
        };
    }

}(document, FORM));