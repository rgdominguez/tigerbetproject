;
'use strict';

;(function(DOC, TRAGAPERRAS){

    let jugar;
    let disponible = 0;
    let url = 'http://localhost:8000/img/';
    let slots_1 = ['cereza', 'naranja', 'ciruela', 'campana', 'bar', 'siete'];
    let slots_2 = ['cereza', 'naranja', 'ciruela', 'campana', 'bar', 'siete'];
    let slots_3 = ['cereza', 'naranja', 'ciruela', 'campana', 'bar', 'siete'];
    let giro1, giro2;
    let number = 0;
    let vueltas = 0;
    let slotsimg;
    let apuesta = 0;
    let acumulado = 0;

    function recogerPremios(){
        let sietes = 0;
        let naranjas = 0;
        let ciruelas = 0;
        let cerezas = 0;
        let bares = 0;
        let campanas = 0;

        let premiados = [
            {'slot': slotsimg[0].alt},
            {'slot': slotsimg[1].alt},
            {'slot': slotsimg[2].alt}
        ];

        /*
        Limón y naranja: 0 puntos
        Ciruelas: 1 puntos
        Cerezas: 2 puntos
        Estrella: 1 puntos
        Dos sietes: 15 puntos
        Dos campanas: 20 puntos
        Bar: Comodín
         */

        console.log(premiados);

        premiados.map(function(elemento){
            if('ciruela' == elemento['slot'] || 'estrella' == elemento['slot']){
                acumulado+=1;
            }
            if('cereza' == elemento['slot']){
                acumulado+=2;
            }
            if('siete' == elemento['slot']){
                sietes+=1;
            }
            if('campana' == elemento['slot']){
                campanas+=1;
            }
            if('cereza' == elemento['slot']){
                cerezas+=1;
            }
            if('bar' == elemento['slot']){
                bares+=1;
            }
        });

        alert(acumulado);

        //dobles y triples
        if(sietes == 2 ||(sietes==1 && bares==1)){ acumulado+=15;}
        if(campanas == 2 || (campanas==1 && bares==1)){ acumulado+=20;}
        if(naranjas == 3 || ciruelas==3 || (naranjas==2 && bares==1) || (ciruelas==2 && bares==1)){ acumulado+=50;}
        if(cerezas == 3 || (cerezas==2 && bares==1)){ acumulado+=100;}
        if(campanas == 3){ acumulado+=80;}
        if(bares == 3){ acumulado+=100;}
        disponible.value = parseInt(acumulado)+parseInt(disponible.value);

        if(acumulado>0) {
            swal({title: "PREMIO",text: "Ganas: " + acumulado + 'puntos.',icon: "success",button: "Cerrar",})
            actualizarResultados(acumulado);
        }
        acumulado = 0;
    }

    function actualizarResultados(acumulado) {
        if (acumulado > 0) {
            let j = location.href.split('/');
            let jlength = j.length;

            let datos_update = {
                'apuesta':acumulado,
                'nombre': DOC.getElementById('username_tg').value.trim(),
                'email':DOC.getElementById('usermail_tg').value.trim(),
                'categoria': 'juegos',
                'subcategoria': j[jlength-2],
                'juego': j[jlength-1],
                'acumulado': acumulado
            };

            $.ajax({
                type: "POST",
                url: "/update-apuesta",
                data: JSON.stringify(datos_update),
                dataType: "json",
                success: function(response) {
                    $('#disponible').val(response.total_acumulado);
                    jugar.style.pointerEvents = 'auto';
                    jugar.style.backgroundColor = '#3bd23b';
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
        }else{

        }
    }


    function addListeners(){
        jugar = DOC.getElementById('play-tragaperras');

        if(null!=jugar){
            jugar.addEventListener('click', getStarted, true);
            slotsimg = DOC.querySelectorAll('.machine .slot img');
            return;
        }
        swal({
            title: "ERROR",
            text: "Ha ocurrido un error inesperado, el juego no está disponible.",
            icon: "error",
            button: "Cerrar"
        });
    }


    function getStarted (ev) {
        ev.preventDefault();

        let j = location.href.split('/');
        let jlength = j.length;

        let player = {
            'apuesta':Number(parseInt(DOC.getElementById('apuesta-amount').value)),
            'disponible': Number(parseInt(DOC.getElementById('disponible').value)),
            'nombre': DOC.getElementById('username_tg').value.trim(),
            'email':DOC.getElementById('usermail_tg').value.trim(),
            'categoria': 'juegos',
            'subcategoria': j[jlength-2],
            'juego': j[jlength-1]
        };

        if(validarApuesta(player)){
            //desactiva el botón
            jugar.style.pointerEvents = 'none';
            jugar.style.backgroundColor = '#d3d3d3';
            insertarApuesta(player);
        }
    }

    function girarRuleta () {
        //desactiva el botón
        jugar.style.pointerEvents = 'none';
        jugar.style.backgroundColor = '#d3d3d3';

        //hace el random de los arrays
        slots_1 = shuffle(slots_1);
        slots_2 = shuffle(slots_2);
        slots_3 = shuffle(slots_3);

        //giro de ruleta
        giro1 = setInterval(girarRuletaInicio, 50);
    }

    //Inicio de giro de ruleta
    function girarRuletaInicio(){
        slotsimg[0].setAttribute('src' , url+slots_1[number]+'.png');
        slotsimg[1].setAttribute('src' , url+slots_2[number]+'.png');
        slotsimg[2].setAttribute('src' , url+slots_3[number]+'.png');

        number += 1;
        if (number > 5){
            number = 0;
            vueltas++;
            if(vueltas >10){
                clearInterval(giro1);
                giro2 = setInterval(giroRuletaFin, 150);
            }
        }
    }


    function giroRuletaFin(){
        vueltas--;
        if (vueltas < 3){
            clearInterval(giro2);
            recogerPremios();

            //Juego finalizado
            jugar.style.pointerEvents = 'auto';
            jugar.style.backgroundColor = '#3bd23b';
        }else{
            if(number>slots_3.length -1){
                number=0;
            }
            slotsimg[0].setAttribute('src' , url+slots_1[number]+'.png');
            slotsimg[1].setAttribute('src' , url+slots_2[number]+'.png');
            slotsimg[2].setAttribute('src' , url+slots_3[number]+'.png');

            slotsimg[0].setAttribute('alt' , slots_1[number]);
            slotsimg[1].setAttribute('alt' , slots_2[number]);
            slotsimg[2].setAttribute('alt' , slots_3[number]);
            number++;

            jugar.style.pointerEvents = 'auto';
            jugar.style.backgroundColor = '#3bd23b';
        }


    }


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
                    girarRuleta();
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

    TRAGAPERRAS.init = function(){
        addListeners();
    }

}(document, TRAGAPERRAS));

document.addEventListener('DOMContentLoaded', function(){
    TRAGAPERRAS.init();
}, true);
