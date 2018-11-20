'use strict';

(function(d, USER){

    function getLoginResponse(params){
        let login_form = {
            'email' : params[0],
            'password'  : params[1]
        };

        $.ajax({
            type: "POST",
            url: "/login-usuario",
            data: JSON.stringify(login_form),
            dataType: "json",
            success: function(response) {
                console.log(response);
                redirect();
            },
            error: function(e){
                console.log('error');
            }
        });
        return;
    }

    function getRegistroResponse(params){
        let reg_form = {
            'email' : params[1],
            'password'  : params[2],
            'nombre' : params[0]
        };

        $.ajax({
            type: "POST",
            url: "/registro-usuario",
            data: JSON.stringify(reg_form),
            dataType: "json",
            success: function(response) {
                console.log(response);
                redirect();
            },
            error: function(e){
                console.log('error');
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