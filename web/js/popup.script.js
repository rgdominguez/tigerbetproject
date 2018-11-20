'use strict';

(function(d, POPUP){

    POPUP.START = 0;
    POPUP.END = 1;
    POPUP.INTERVAL = 0.3;
    POPUP.LOGINFIELDS = [d.getElementById('lemail'), d.getElementById('lpassword'), null];

    function inicializarPopUp(id){
        let loginpopup = d.querySelectorAll("."+id);
        let cerrarpopup = d.getElementsByClassName("popup-cerrar");
        POPUP.show(loginpopup);
        POPUP.hide(cerrarpopup);
        sendRequest();
    }

    POPUP.show = function(inputs){
        inputs.forEach(function(elem){
            elem.addEventListener('click', ev =>{
                let op = POPUP.START;
                let pop = d.getElementById('admin-popup');
                pop.style.display = 'block';
                let idshow = setInterval(function(){
                    pop.style.opacity = op;
                    if(op>1){clearInterval(idshow);}
                    op+=POPUP.INTERVAL;
                }, 100);
            }, false);
        });
    }

    POPUP.change_login_registro = function(){
        let cambio2registro = d.getElementById('change2registro');
        let cambio2login = d.getElementById('change2login');
        let forms = new Array();
        forms[0] = d.forms[0];
        forms[1] = d.forms[1];
        let arrayfields = new Array();

        if(null!=cambio2registro){
            cambio2registro.addEventListener('click', function(e){
                e.preventDefault();
                document.forms[0].classList.remove('show');
                document.forms[0].classList.add('hide');
                document.forms[1].classList.remove('hide');
                document.forms[1].classList.add('show');

                //Estoy en el form de registro;
                POPUP.LOGINFIELDS = forms[1].elements;
                console.log('**** campos para el form de registro *****');
                console.log(POPUP.LOGINFIELDS);

            }, true);
        }

        if(null!=cambio2login){
            cambio2login.addEventListener('click', function(e){
                e.preventDefault();
                document.forms[1].classList.remove('show');
                document.forms[1].classList.add('hide');
                document.forms[0].classList.remove('hide');
                document.forms[0].classList.add('show');

                //Estoy en el form de login;
                POPUP.LOGINFIELDS = forms[0].elements;
                console.log('**** campos para el form de login *****');
                console.log(POPUP.LOGINFIELDS);
            }, true);
        }
    }

    POPUP.close = ()=>{
        let op = POPUP.END ;
        let pop = d.getElementById('admin-popup');
        let idhide = setInterval(function(){
            pop.style.opacity = op;
            if(op<-1.5){ pop.style.display = 'none'; clearInterval(idhide);}
            op-=POPUP.INTERVAL;
        }, 100);
    }

    /*ESCONDE EL POPUP DE REGISTRO DE USUARIOS*/
    POPUP.hide = function(cerrarpopup){
        for(let i=0; i<cerrarpopup.length; i++){
            cerrarpopup[i].addEventListener('click', (ev)=>{
                POPUP.close();
            }, false);
        }
    }

    function validate(){
        let pass_input = d.getElementById('lpassword');
        let email_input = d.getElementById('lemail');
        console.log(email_input.value);
        console.log(pass_input.value);
    }

    /*ENVÍA LA PETICIÓN DEL FORMULARIO*/
    function sendRequest(arrayfields){
        let submits = d.getElementsByClassName('form-submit');
        POPUP.change_login_registro();

        for(let i=0; i<submits.length; i++){
            submits[i].addEventListener('click', function(ev){
                ev.preventDefault();
                console.log(USER.init(POPUP.LOGINFIELDS));
            }, true);
        }
        return;
    }

    POPUP.iniciar = function(id){  inicializarPopUp(id); };
}(document, POPUP));