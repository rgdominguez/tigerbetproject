'use strict';

(function(d, USER){

        USER.EMAILPATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function valEmail(email) {
        if(!USER.EMAILPATTERN.test(email.trim())){
            return false;
        }
        return true;
    }


    function getLoginResponse(params){
        let login_form = {
            'email' : params[0],
            'password'  : params[1]
        };


        if(!valEmail($('#lemail').val())){
            $('#lemail').val('');
            $('#lemail').focus();
            $('#lemail+p').text('Introduce un email válido');
            return;
        }

        $.ajax({
            type: "POST",
            url: "/login-usuario",
            data: JSON.stringify(login_form),
            dataType: "json",
            success: function(response) {
                console.log(response);
                if(response.data == 'ko'){
                    $('.align-centrado.msg-error').text('Usuario o password incorrectos');
                    $('#lemail').val('');
                    $('#lpassword').val('');
                    $('#lemail').focus();
                }else{
                    $('.align-centrado.msg-error').css({'color': 'green'});
                    $('.align-centrado.msg-error').text('Bienvenido. Redirigiendo...');
                    window.location = 'http://localhost:8000/inicio';
                }

            },
            error: function(e){
                alert('error');
            }
        });
        return;
    }

    function getRegistroResponse(params){
        console.log(params);
        let reg_form = {
            'email' : params[1],
            'password'  : params[2],
            'nombre' : params[0],
            'password2': params[3]
        };


        if(!valEmail(reg_form.email)){
            $('#remail').val('');
            $('#remail').focus();
            $('#remail+p').text('Introduce un email válido');
            setTimeout(function () {
                $('#remail+p').text('');
            }, 2400);
            return;
        }

        if(reg_form.password != reg_form.password2){
            $('#rpassword').val("");
            $('#rpassword2').val("");
            $('#rpassword+p').text('Las contraseñas no coinciden');
            setTimeout(function () {
                $('#rpassword+p').text('');
            }, 2400)
            return;
        }

        $.ajax({
            type: "POST",
            url: "/registro-usuario",
            data: JSON.stringify(reg_form),
            dataType: "json",
            success: function(response) {
                $('.align-centrado.msg-error').css({'color': 'green'});
                $('.align-centrado.msg-error').text('Bienvenido. Redirigiendo...');
                window.location = 'http://localhost:8000/inicio';
            },
            error: function(e){
                swal({title: "ERROR",text: "Error SYNC en el registro del nuevo usuario",icon: "error",button: "Cerrar",})
            }
        });
        return;
    }

    function redirect(){
        POPUP.close();
        setTimeout(function(){
            window.location = 'http://localhost:8000/inicio';
        }, 500);

    }

    function loguear_registrar(nodos){
        console.log("- numero de nodos -" + nodos.length);
        let nnodos = nodos.length;
        let params = new Array();

        for(let i=0; i<nnodos-1; i++){ params[i] = nodos[i].value; }
        params.map(function(elem){ elem = elem.trim().toLowerCase(); });
        switch(nnodos) {
            case 3: getLoginResponse(params); break;
            case 5: getRegistroResponse(params); break;
            default: break;
        }
    };

    USER.init = function(args){
        loguear_registrar(args);
    }

}(document, USER));