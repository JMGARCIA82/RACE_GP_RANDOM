window.onload=function(){

    let participantes; // Almacena los valores aleatorios de la función Ramdon.
    let meta=1; // Variable que indica la posición final de cada participante.

    $(document).ready(function(){
        //console.log("Jquery y la web cargados..");
        $("#participantes").change(function(){

            $("#circuito").empty();
            
            let seleccion=$(this).children("option:selected").val();// Obtenemos el valor de la selección del select y lo guardo en la variable participantes.
            participantes=parseInt(seleccion); // Casteamos la variable.
            let bikesArray=new Array(); // Creamos el array.

			for (let i = 1; i <= participantes; i++) { // Cargamos el array con las con las imágenes de las motos, sus rutas y el id que les corresponde.
				bikesArray[i] = "<hr>" + "<div id ='bikes" + i + "' >" + "<p id='posicion" + i + "'></p>" +"<img src='img/bike" + i + ".png' id='bike" + i + "'>";

				$("#circuito").append(bikesArray[i]);	// Añadimos al id circuito el array con las imágenes.
				//console.log(bikesArray[i]);				
			}
        });

        $("#iniciar").click(function () { // Evento ejecutado cuando hacemos clic en el botón iniciar.

            $(this).hide(); // Oculto el botón Iniciar
            $("#reiniciar").show(); // Muestro el botón Reiniciar

            for (let z = 1; z <= participantes; z++) {   //Animamos el array con las imágenes de las motos mediante un bucle For.

                let numeroAleatorio = Math.floor((Math.random() * 1000) + 1); // Guardo en la variable numeroAleatorio el valor de la función random, con la que obtenemos un número aleatorio.
                
                // Ejecutamos la función animate para dar movimiento a los vehículos aplicando la variable numeroAleatorio.
                $("#bikes" + z).animate({ marginLeft: "+=95%" }, 7 * numeroAleatorio, function () { // Le indicamos la distancia a recorrer en %, así evitamos problemas de dimensiones de pantallas.
                    //console.log(z);
                    // Añadimos una fila a la tabla en cada llegada.
                    $("#clasificacion").append("<tr><td>" + meta + "</td><td>Moto" + z + "</td></tr>");
                    	//console.log("Llegada a meta "+meta);
                        //console.log("Participantes "+participantes);
                        //console.log("Participante "+z);
                    if (meta == participantes) { // Utilizamos un conficional para buscar cuando llega la última moto.
                        // Mostramos la posición de llegada e incrementamos la variable meta.
                        $("#posicion" + z).append((meta++));

                        $(document).ready(function () {
                            $("#tablaFinal").show(); // Carcagamos la tabla cada vuelta de bucle para que aparezca la tabla cada vez que se hace clic.
                        });
                    }
                    else {
                        $("#posicion" + z).append((meta++)); // Incrementamos la posicón de llegada.
                    }
                });
            }
        });

        // Reiniciar la partida con el vento clic en el botón reiniciar.
        $("#reiniciar").click(function () {

            for (let x = 1; x <= participantes; x++) {
                $("#posicion" + x).empty(); // Eliminamos el mensaje de la posición
                $("#bikes" + x).stop();    // Paramos la ejecución.
                $("#bikes" + x).animate({ marginLeft: '0px' }, 2000); // Retrocedemos los coches a la posición inicial.
                meta = 1; // reseteo la variable de las posiciones finales
            }

            $("#clasificacion").empty(); // Eliminamos los datos de la tabla.
            $("#tablaFinal").hide(); // Ocultamos la tabla.
            $(this).hide(); // Oculto el botón Reiniciar.
            $("#iniciar").show(); // Muestro el botón Iniciar								
        });
    });
}