;
'use strict';

(function(_7YMEDIO){

    let jugar;
    let disponible = 0;
    let mazo_cartas;
    let carta_descubierta;
    let plantarse;
    let cartas_usuario;
    let apuesta = 0;
    let player = {};
    let res_text;
    let contador = 0;
    let puntos_usuario = 0;
    let TOTAL = 0;
    let  ARRAY_CARTAS = [];
    let puntos_maquina = 0;
    let banca_text;
    let idsacarCartasBanca = null;
    let primera_ronda = true;

    function initMazo() {
        ARRAY_CARTAS = [
            '1Oros', '2Oros', '3Oros', '4Oros', '5Oros', '6Oros', '7Oros', '8Oros', '9Oros', '10Oros', '1Copas', '2Copas', '3Copas', '4Copas', '5Copas', '6Copas', '7Copas', '8Copas', '9Copas', '10Copas', '1Espadas', '2Espadas', '3Espadas', '4Espadas', '5Espadas', '6Espadas', '7Espadas', '8Espadas', '9Espadas', '10Espadas', '1Bastos', '2Bastos', '3Bastos', '4Bastos', '5Bastos', '6Bastos', '7Bastos', '8Bastos', '9Bastos', '10Bastos'];
    }

    function addListeners(){
        jugar = document.getElementById('play');
        initMazo();
        mazo_cartas = document.getElementsByClassName('baraja')[0];
        carta_descubierta = document.getElementsByClassName('baraja')[1];
        plantarse = document.getElementById('plantarse');
        plantarse.addEventListener('click', function (ev) {
            ev.preventDefault();
            me_planto(juegaMaquina);
        }, false);
        cartas_usuario = document.querySelectorAll('.jugada-usuario img');
        banca_text = document.getElementById('banca_h3');
        document.getElementById('saca-cartas-h3').style.opacity = 0;
        res_text = document.getElementById('res_text');
        mazo_cartas.style.pointerEvents = 'none';
        jugar.addEventListener('click', getStarted, true);
    }

    String.prototype.replaceAll = function(search, replacement) {
        let target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    function me_planto(f) {
        mazo_cartas.style.pointerEvents = 'none';
        mazo_cartas.children[0].style.display = 'none';
        carta_descubierta.src="";
        carta_descubierta.style.opacity = 0;
        f();
    }

    function juegaMaquina() {
        swal({
            title: "TURNO DE LA BANCA",
            text: "Suerte!",
            icon: "success",
            button: "Cerrar",
            dangerMode: false,
        })
            .then(() => {
                plantarse.style.pointerEvents = 'none';
                plantarse.style.background = 'rgb(211, 211, 211)';
                sacarCartasMaquina();
            });
    }

    function sacarCartasMaquina() {
        contador = 0;
        idsacarCartasBanca = setInterval(function () {
            if((puntos_maquina <= 7.5)&&(puntos_maquina<=TOTAL)){
                (carta_descubierta.children[0].children[0]).src = '/img/'+ARRAY_CARTAS[0]+'.jpg';
                carta_descubierta.style.opacity = 1;
                puntos_maquina +=getPuntos(ARRAY_CARTAS[0]);
                eliminarCartaDelMazo(ARRAY_CARTAS[0]);
                banca_text.innerHTML = 'BANCA: ' + puntos_maquina;
                console.log('************ PUNTOS ***********')
                console.log(puntos_maquina);
                contador++;
            }else{
                if(puntos_maquina > 7.5){
                    aumentarDisponibleUsuario(player.apuesta*2);
                    swal({
                        title: "FELICIDADES",
                        text: "Ganas " + player.apuesta*2 + "Redirigiendo...",
                        icon: "success",button: "Cerrar",
                    });
                }else{
                    swal({
                        title: "LA BANCA GANA",
                        icon: "error",button: "Cerrar",
                    }).then(()=>{
                        setTimeout(function () {
                            reiniciarJuego();
                        }, 800)
                    });
                }
                clearInterval(idsacarCartasBanca);
            }
        }, 2500);

    }


    function getStarted(ev){
        ev.preventDefault();
        let j = location.href.split('/');
        let jlength = j.length;
        player = {
            'apuesta':Number(parseInt(document.getElementById('apuesta-amount').value)),
            'disponible': Number(parseInt(document.getElementById('disponible').value)),
            'nombre': document.getElementById('username_tg').value.trim(),
            'email':document.getElementById('usermail_tg').value.trim(),
            'categoria': 'juegos',
            'subcategoria': j[jlength-2],
            'juego': j[jlength-1].replaceAll('%20', ' ')
        };


        if(validarApuesta(player)){
            insertarApuesta(player);
        }
    }

    function aumentarDisponibleUsuario(cantidad) {
        let j = location.href.split('/');
        let jlength = j.length;

        let datos_update = {
            'apuesta':player.apuesta*2,
            'nombre': document.getElementById('username_tg').value.trim(),
            'email':document.getElementById('usermail_tg').value.trim(),
            'categoria': 'juegos',
            'subcategoria': j[jlength-2],
            'juego': j[jlength-1],
            'acumulado': player.apuesta*2
        };

        $.ajax({
            type: "POST",
            url: "/update-apuesta",
            data: JSON.stringify(datos_update),
            dataType: "json",
            success: function(response) {
                reiniciarJuego();
            },
            error: function(e){
                swal({
                    title: "Error en la actualización",
                    text: "No se ha podido actualizar la base de datos",
                    icon: "error",
                    button: "Cerrar",
                });
            }
        });
    }

    function validarApuesta(player){
        if(player.apuesta > player.disponible){
            swal({
                title: "Disponible insuficiente!",
                text: "El crédito disponible en este momento es menor a la apuesta",
                icon: "error",
                button: "Cerrar",
            });
            return false;
        }
        if(player.apuesta <=0){
            swal({
                title: "Error!",
                text: "Apuesta no válida",
                icon: "error",button: "Cerrar",
            });
            return false;
        }
        if(player.apuesta > 0 && (player.apuesta <= player.disponible)){ return true; }
    }

    function insertarApuesta(player) {
        $.ajax({
            type: "POST",
            url: "/insertar-apuesta",
            data: JSON.stringify(player),
            dataType: "json",
            success: function(response) {
                if(response.insertado){
                    $('#disponible').val(response.disponible);
                    $('#apuesta-amount').attr('placeholder', '0');
                    $('#apuesta-amount').val(0);
                    ARRAY_CARTAS = shuffle(ARRAY_CARTAS);
                    document.getElementById('saca-cartas-h3').style.opacity = 1;
                    jugar.style.pointerEvents = 'none';
                    jugar.style.backgroundColor = '#d3d3d3';
                    mazo_cartas.style.opacity = '1';
                    mazo_cartas.style.pointerEvents = 'auto';
                    sacarCartasUsuario();
                }else{
                    swal({
                        title: "Error",
                        text: "Error de inserción en la Base de Datos",
                        icon: "error",
                        button: "Cerrar",
                    });
                }
            },
            error: function(e){
                swal({
                    title: "Error grave",
                    text: "No se ha podido actualizar la base de datos",
                    icon: "error",
                    button: "Cerrar",
                });
            }
        });
    }

    function sacarCartasUsuario() {
        mazo_cartas.addEventListener('click', function () {
            carta_descubierta.style.opacity = 1;
            plantarse.style.background='crimson';
            plantarse.style.pointerEvents = 'auto';
            (carta_descubierta.children[0].children[0]).src = '/img/'+ARRAY_CARTAS[0]+'.jpg';
            cartas_usuario[contador].src = '/img/'+ARRAY_CARTAS[0]+'.jpg';
            cartas_usuario[contador].style.opacity = 1;


            puntos_usuario=+getPuntos(ARRAY_CARTAS[0]);
            TOTAL+=puntos_usuario;
            console.log('TOTAL = ' + TOTAL);
            res_text.innerHTML = 'Puntuación: ' + TOTAL;
            eliminarCartaDelMazo(ARRAY_CARTAS[0]);

            if(parseFloat(TOTAL)> 7.5){
                swal({
                    title: "Lástima, te pasaste!",
                    text: "Has sacado: "+TOTAL+" Suerte para la próxima jugada",
                    icon: "error",button: "Cerrar",
                });
                reiniciarJuego();
                return;
            }else{
                contador++;
            }
        }, true);
    }

    function reiniciarJuego() {
        window.location.href = window.location.origin + window.location.pathname;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getPuntos(cadena) {
        return (parseInt(cadena) > 7) ? 0.5 : parseInt(cadena) ;
    }

    function eliminarCartaDelMazo(carta) {
        ARRAY_CARTAS.splice(ARRAY_CARTAS.indexOf(carta),1);
    }

    _7YMEDIO.init = function(){
        addListeners();
    }

}(_7YMEDIO));

document.addEventListener('DOMContentLoaded', function(){
    _7YMEDIO.init();
}, true);
