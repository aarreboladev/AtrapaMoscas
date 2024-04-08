
// ANTES DE NADA !! La mosca esta con firebase pero la entrego asi porque no guardé una copia sin firebase, ya que cuando me puse a hacer firebase no estaba acabada la practica porque tenia unas cosas por hacer que tenia que consultarte.
// tampoco esta acabada del todo el firebase, falta dos puntuaciones ya que se suman en el mismo div y falta que el temporizador este en firebase y se vea en ambas pantallas.

// y ya estaria

// LINK PARA JUGAR : http://moscaarrebola2.000webhostapp.com/ 

// instrucciones: en principio deberia de ir de cualquier manera, pero bueno... -> si eres el jugador 1 dale al player 1 a empezar si estas jugando solo... si hay otro jugador cuando le de al player 2 ya le podras dar a empezar. En teoria da igual cuando le des a empezar ya que en principio el jugador 2 se puede unir a la partida en cualquier momento.




var firebaseConfig = {  // linkeo la database
  apiKey: "AIzaSyBgA-Ovr_fd66mMkANXGnAotUok_Vtsbww",
  authDomain: "mosca-2cf0b.firebaseapp.com",
  databaseURL: "https://mosca-2cf0b.firebaseio.com",
  projectId: "mosca-2cf0b",
  storageBucket: "mosca-2cf0b.appspot.com",
  messagingSenderId: "662591963251",
  appId: "1:662591963251:web:586604345fed2939d76a06",
  measurementId: "G-SW897KWZDC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); // inicializo la bd 
  db = firebase.database() // variable para db

  ref = db.ref("datosMosca"); // referencia para saber que tabla uso
  jugador="jugador1/" // seteo la variable jugador que utilizare para determinar a que tabla meter los valores 
  jugadorsinbarra="jugador1" // seteamos la misma variable que antes pero sin la barra
  ref2 = db.ref(jugador);  // Creamos una referencia a la db para acortar el codigo pero con la variable jugador 
  ref3=db.ref("juego/"); // Creamos una referencia a la db para acortar el codigo 
  puntuacion="#puntuacion"; // creo una variable para la puntuacion igual que hago con jugador
 ref8=db.ref(jugadorsinbarra); // Creamos una referencia a la db para acortar el codigo pero con la variable jugador sin la barra

  db.ref("jugador1").on("value", function(snapshot) { // este codigo lo utilizamos para sacar valores de la database, utilizamos el on para que este constantemente escuchando los cambios de la db  en este caso de la tabla jugador1 
      newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna


     $("#puntero").attr("style"," position: absolute; top:"+(newPost.y)+"px; left:"+(newPost.x)+"px"); // movemos la posicion del puntero a traves de los resultados de la consulta de la bd 

     estado=newPost.estado; // creamos una variable para guardar el resultado de la consulta, en este caso sacamos la variable de la columna estado.
if (estado==1){// if si el estado (que es una columna de la bd ) es igual a 1 entra
  $("#puntero").attr("src","img/miraRoja.svg"); // cambiamos la imagen del puntero a rojo
} // end if 
else{// else 
  $("#puntero").attr("src","img/mira.webp");// cambiamos la imagen del puntero 
} // end else 
   
   }); // end de la consulta (on)
   db.ref("jugador2").on("value", function(snapshot) {  // este codigo lo utilizamos para sacar valores de la database, utilizamos el on para que este constantemente escuchando los cambios de la db  en este caso de la tabla jugador2
    newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna

   $("#puntero2").attr("style"," position: absolute; top:"+(newPost.y)+"px; left:"+(newPost.x)+"px"); // movemos la posicion del puntero a traves de los resultados de la consulta de la bd 
   estado=newPost.estado; // creamos una variable para guardar el resultado de la consulta, en este caso sacamos la variable de la columna estado.
if (estado==1){ // if si el estado (que es una columna de la bd ) es igual a 1 entra
  $("#puntero2").attr("src","img/miraRoja.svg");// cambiamos la imagen del puntero a rojo
}// end if 
else{ // else 
  $("#puntero2").attr("src","img/mira2.png"); // cambiamos la imagen del puntero 
} // end else 
 
 }); // end de la consulta (on)
   
   firebase.database().ref('juego/').update({ // inserto en la tabla datosMosca los siguientes valores en este caso un update a la tabla juego
    principal:0 // actualizamos en la bd este dato
  });    // end del update 

  
    firebase.database().ref('juego/').update({ // inserto en la tabla datosMosca los siguientes valores en este caso un update a la tabla juego
      player2:0 // actualizamos en la bd este dato
    });   // end del update 


   $("#empezar").click(function(){ // evento que se produce cuando se hace click en el boton empezar
  
   
    setInterval(function(){frame();}, 10); // creamos un intervalo que llame a la funcion frame cada 10 milesimas
    setInterval(function(){time();}, 1000);  // creo un intervalo que llame a la funcion time 
    setInterval(function(){generarVelocidades();}, Math.floor(Math.random() * (5000 - 3000 ))); // creamos un intervalo que llame a la funcion generarVelocidades en un intervalo de entre 5 y 3 segundos randoms
   
      $("#empezar").blur(); // Con esta funcion quitamos el foco del boton de empezar

      firebase.database().ref('juego/').update({ // inserto en la tabla datosMosca los siguientes valores en este caso un update a la tabla juego
        principal:1 // actualizamos en la bd este dato
      });   
      firebase.database().ref('jugador1/').update({ // inserto en la tabla datosMosca los siguientes valores
        puntuacion1:0// actualizamos en la bd este dato
        
      }); 
      firebase.database().ref('jugador2/').update({ // inserto en la tabla datosMosca los siguientes valores
        puntuacion2:0// actualizamos en la bd este dato
        
      });    // fin update

  });
  $("#player2").click (function(){ // creamos un evento que cuando se de click en el boton de player 2 ejecute el siguiente codigo
    firebase.database().ref('juego/').update({ // inserto en la tabla datosMosca los siguientes valores
      player2:1// actualizamos en la bd este dato
      
    });     // end del update 
    puntuacion="#puntuacion2"; // seteo la variable puntuacion
    jugador="jugador2/" // seteamos al variable jugador con jugador2 
    jugadorsinbarra="jugador2" //  seteamos al variable jugador con jugador2 
    ref3.once("value", function(snapshot) { // utilizamos ref3 que es una variable que incluye la referencia a la base de datos en este caso de la tabla juego utilizamos once para que consulte solo una vez cada vez que se produce el evento
      newPost = snapshot.val();  // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
      p2=newPost.player2 // creamos una variable que guarde el valor del resultado de la consulta 
     
    
    }); // end consulta (on)
    setInterval(function(){  // creo un intervalo que ponga por pantalla el tiempo consltando a la bd cada segundo
      firebase.database().ref('juego/').once("value", function(snapshot) {  // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
        newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
        tiempo=newPost.tiempo
        $("#tiempo").html("Tiempo: " + tiempo ); // metemos el valor de la variable mosca en el div con id puntuacion
          
      });
      
    }, 1000); 
  }); // end del evento click

  $("#player1").click(function(){// creamos un evento que cuando se de click en el boton de player 1 ejecute el siguiente codigo
    jugador="jugador1/" // seteamos al variable jugador con jugador1
    jugadorsinbarra="jugador1" //  seteamos al variable jugador con jugador2 
    puntuacion="#puntuacion";
    ref3.on("value", function(snapshot) {  // utilizamos ref3 que es una variable que incluye la referencia a la base de datos en este caso de la tabla juego utilizamos once para que consulte solo una vez cada vez que se produce el evento
      newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
      p2=newPost.player2 // creamos una variable que guarde el valor del resultado de la consulta 
    
    
    }); // fin de la consulta 
    
  }); // fin del evento click

  $("#selva").mousemove(function(){ // evento que ejecuta el siguiente codigo cuando se produce el moviento del raton dentro del div selva 

    db.ref(jugadorsinbarra).once("value").then(function(snapshot){ // consulta a la bd con la referencia de jugadorsinbarra, utilizamos esta variable para solo consultar una vez y que dependiendo en que boton de jugador hayas dado click consulta la tabla del jugador 1 o del jugador 2 
      
      newPost = snapshot.val();// asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
      p=newPost.principal // creamos una variable que guarde el valor del resultado de la consulta 
 
      // llamamos al metodo de mover del objeto puntero.
      
     
    }); // end consulta (once)
    puntero.mover(event);
  }); // end evento mousemove

 ref.on("value", function(snapshot) { // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
  newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna

  estado=newPost.estado; // creamos una variable que guarde el valor del resultado de la consulta 
  if (estado=="muerta"){ // if consultando al variable extraida de la bd para saber si esta muerta
    $("#mosca").attr("src","img/basura.webp"); // cambiamos la imagen de la mosca 
  } // end if 
  else{ // else 
    $("#mosca").attr("src","img/mosca.webp");  // cambiamos la imagen de la mosca 
  } // end else 
}); // end consulta a la bd con metodo on 

ref.on("value", function(snapshot) {  // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna


$("#mosca").attr("style"," position: absolute; left:"+(newPost.posX)+"px; top:"+(newPost.posY)+"px; "); // cambiamos la pocion de la mosca con los resultados de la bd de este modo la mosca se movera con los datos de la bd y podremos verlo en ambas pantallas 

}); // end consulta a la bd con metodo on 





function generarVelocidades(){ // creamos funcion con nombre generarvelocidades
randomX = Math.floor(Math.random() * 6 - 3 ); // generamos un numero random entre el -3 y el 6 y lo guardamos en una variable 
randomY = Math.floor(Math.random() * 6 - 3 );// generamos un numero random entre el -3 y el 6 y lo guardamos en una variable 
mosca.velX=randomX; // insertamos la velocidad de la mosca random en local
mosca.velY=randomY; // insertamos la velocidad de la mosca random en local

firebase.database().ref('datosMosca/').update({ // updateo en la tabla datosMosca los siguientes valores
  velX: randomX, // update a la variable velX con la variable random que hemos creado anteriormente
  velY: randomY// update a la variable velX con la variable random que hemos creado anteriormente
  
}); // end update
} // fin funcion 

  function recibirVelocidades(){ // creamos funcion 
      ref.once("value", function(snapshot) { // hacemos una consulta al a bd con la variable ref como referencia a la bd y utilizando el metodo once para que solo lo ejecute una vez cada vez que la llamamos 
         newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
         mosca.velX=newPost.velX; // guardamos la variable de la bd en la velocidad de la mosca para que sea el valor de la bd la velocidad de la mosca y asi poder ver la velocidad en ambas pantallas
         mosca.velY=newPost.velY; // guardamos la variable de la bd en la velocidad de la mosca para que sea el valor de la bd la velocidad de la mosca y asi poder ver la velocidad en ambas pantallas

       }); // end consulta bd cn metodo once 
  }
    
cont=60; // creamos variable
moscas=0;// creamos variable
selvaX=$("#selva").offset().left; // creamos variable con el offset left de la selva para saber las cordenadas de la selva del eje x 
selvaY=$("#selva").offset().top;  // creamos variable con el offset top de la selva para saber las cordenadas de la selva del eje y 
selvaWidth=$("#selva").width();  // creamos variable con la funcion width para saber el el ancho del div  
selvaHeight=$("#selva").height();// creamos variable con la funcion width para saber el el alto del div 
moscaWidth=$("#mosca").width(); // creamos variable con la funcion width para saber el el ancho del div  
 moscaHeight=$("#mosca").height(); // creamos variable con la funcion width para saber el el alto del div 
 moscaX=$("#mosca").offset().top;  // creamos variable con el offset top de la mosca para saber las cordenadas de la mosca del eje y
 moscaY=$("#mosca").offset().left; // creamos variable con el offset left de la mosca para saber las cordenadas de la mosca del eje x
arribaDerechaSelva=selvaWidth + selvaX; // creamos una variable para sumar la posicion del div junto al ancho 
arribaIzquierdaMosca=moscaX + moscaY; // creamos una variable para sumar las coordenadas de la mosca







moscas=0; // creamos variable 
moscas2=0;
contadorMosca=0; // creamos variable


function time(){ // creamos la funcion time 
 
    cont--;
    firebase.database().ref('juego/').update({ // update en la tabla juego los siguientes valores 
      tiempo:cont // ponemos el valor deseado en la columna contadorMosca
      
    });
    firebase.database().ref('juego/').once("value", function(snapshot) {  // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
      newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
      tiempo=newPost.tiempo
      $("#tiempo").html("Tiempo: " + tiempo ); // metemos el valor de la variable mosca en el div con id puntuacion
        
    });
    firebase.database().ref('juego/').once("value", function(snapshot) {  // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
      newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
      tiempo=newPost.tiempo
      $("#tiempo").html("Tiempo: " + tiempo ); // metemos el valor de la variable mosca en el div con id puntuacion
        
    });
  
 
  if (cont==0){ // if si el contador es igual a 0 
      alert("Se acabo el tiempo crack"); // mensaje deseado 
      location.reload(); // refrescamos la pagina
  } // end if 
} //end funcion 

function frame(){ // creamos funcion frame

    ref.once("value").then(function(estado){ // consultamos a la base de datos con la variable ref con referencia a la tabla datosMosca utilizamos el metodo once para que consulte una vez la bd cada vez que la llamamos y el then para que ejecute la funcion una vez se haga la consulta

      if(estado.val().estado=="viva"){ // if que entra si la variable estado (consultada con la bd ) es igual a viva entra
        mosca.mover(); // llamamos al metodo mover

    } // end  if 
      

    else{ // else 

    contadorMosca++;  // incrementamos el contador 

    // METER ESTE VALOR A LA DATABASE Y HACER EL IF CON LA CONSULTA 

      if (contadorMosca>200){ // if que entra si el contador es mayor que 200 
      
            firebase.database().ref('juego/').update({ // update en la tabla juego los siguientes valores 
              contadorMosca:contadorMosca // ponemos el valor deseado en la columna contadorMosca
              
            }); // end consulta (update)

            ref3.once("value", function(snapshot) { // consultamos la bd con la variable ref3 como referencia  
              newPost = snapshot.val(); //// asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna 
        
            contadorMoscas=newPost.contadorMosca; // // guardamos el resultado de la consulta a la columna en una variable 
            
            if (contadorMoscas>200){ // if condicion contado mayor que 200 
            
              firebase.database().ref('datosMosca/').update({ // inserto en la tabla datosMosca los siguientes valores
                estado:'viva' // updateamos el estado a viva 
              }); // fin consulta
              $("#mosca").attr("src","img/mosca.webp"); // cambiamos la imagen a la mosca 
              contadorMoscas=0; // seteamos el valor a 0 
          
              randomX = Math.floor(Math.random() * (arribaDerechaSelva-selvaX) + 1  ); // genero random entre las variables (width y offset left ) 
              randomY = Math.floor(Math.random() * (selvaHeight - selvaY) ); // genero random entre las variables (height y offset top )
              mosca.x=randomX; // guardo la variable random en la posicion de la mosca (en local) 
              mosca.y=randomY; // guardo la variable random en la posicion de la mosca (en local)

            } // 
                  
        
              }); // fin consulta 
          contadorMosca=0; // seteamos a 0 
      } // end if 

    } // fin else 

    }) // fin consulta


} // fin funcion fframe


$(document).keypress(function (e) { // creamos evento para cuando se presione uan tecla ejecute el siguiente codigo
    tecla = e.which; // seteamos la variable tecla a la tecla que es pulsada 


    db.ref(jugadorsinbarra).on("value", function(snapshot) { // consulta a la bd con referencia a la variable en este caso jugador  y utilizamos el metodo on para escuchar constantemente
      newPost = snapshot.val();// asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna 

    estado=newPost.estado; // metemos en la variable estado el resultado de la consulta 
    if (tecla == 32 && estado==1){ // if si la tecla pulsada es el espacio y si el estado es igual a 1 
      matar(); // llamamos a la funcion matar 
      if (jugadorsinbarra=="jugador1"){ // if si estamos con el jugador 1 entra aqui 
        moscas++; // incrementamos la variable de las moscas 
        firebase.database().ref('jugador1/').update({ // update en la tabla juego los siguientes valores 
          puntuacion1:moscas // ponemos el valor deseado en la columna contadorMosca
          
        });
        
      } // end if 
      if (jugadorsinbarra=="jugador2"){ // if si estamos con el jugador 2 entra aqui
        moscas2++; // incrementamos la variable de las moscas2 
        //console.log(moscas2); 
        firebase.database().ref('jugador2/').update({ // update en la tabla juego los siguientes valores 
          puntuacion2:moscas2 // ponemos el valor deseado en la columna contadorMosca
          
        }); // end update
        
        

      } // end if 
    } // end if 


    else{ // else 
      tecla=0; // seteamos la tecla a 0  
    } // fin else
    firebase.database().ref('jugador1/').once("value", function(snapshot) {  // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
      newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
      puntuacion1=newPost.puntuacion1
      $("#puntuacion").html("Puntuación Jugador 1:" + puntuacion1 ); // metemos el valor de la variable mosca en el div con id puntuacion
        });
        firebase.database().ref('jugador2/').once("value", function(snapshot) {  // consulta a la bd con la variable ref como referencia (datosMosca) y utilizamos el metodo on para escuchar constantemente si la mosca esta viva o muerta para cambiar la imagen
          newPost = snapshot.val(); // asignamos una variable despues sacar las variables de la bd con newPost.NombreColumna
          puntuacion2=newPost.puntuacion2
          $("#puntuacion2").html("Puntuación Jugador 2:" + puntuacion2 ); // metemos el valor de la variable mosca en el div con id puntuacion
          
        }); 
    }); // fin consulta

}); // fin evento teclado





function matar(){ // creamos la funcion matar
  $("#mosca").attr("src","img/basura.webp"); // cambiamos la imagen de la mosca  
  contadorMosca=0; // seteamos variable a 0 
  mosca.estado="muerta"; // cambiamos la variable estado de la mosca a muerta 
  

  firebase.database().ref('datosMosca/').update({ // inserto en la tabla datosMosca los siguientes valores

    
    estado:'muerta' // updateamos  la variable a muerta 
    
  }); // fin update 
  
  tecla=0; // seteamos la variable a 0 
 
  

} // fin funcion matar


mosca = new Object(); // creamos objeto

mosca.x=500; // creamos la propiedad x (la posicion)
mosca.y=100;// creamos la propiedad y (la posicion)
recibirVelocidades(); // llamamos a la funcion recibirVelocidades 

mosca.estado="viva"; // creamos la propiedad estado 

firebase.database().ref('datosMosca/').update({ // update en la tabla datosMosca los siguientes valores
  posX: mosca.x, // metemos la posicion  x de la mosca en la variable posX
  posY: mosca.y, // metemos la posicion  y de la mosca en la variable posY
  estado:'viva' // metemos el estado de la mosca en la variable estado

}); // fin update




mosca.mover=function(){ // creamos el metodo mover de la mosca 
     
    if (mosca.x+moscaWidth>arribaDerechaSelva-selvaX){ // if para si se sale del eje x de la selva entre  
     
     this.velX=this.velX * -1; // multiplicamos la velocidad por -1 para que vaya en sentido contrario 
     
    } // end if 


    if (mosca.y+moscaHeight>selvaHeight){ // if para que cuando se salga de el eje Y de la selva entre 
      this.velY=this.velY * -1; // multiplicamos la velocidad por -1 para que vaya en sentido contrario 
      
     } // end if 

   
   
   this.x=this.x+this.velX; // sumamos la posicion de la mosca mas la velocidad 
   this.y=this.y+this.velY;// sumamos la posicion de la mosca mas la velocidad 
     
    if (mosca.x<0){ // si la posicion de la mosca es menor que 0 entra 
       this.velX=this.velX*-1; // multiplicamos la velocidad por -1 para que vaya en sentido contrario 
    } // end if 
    if (mosca.y<0){ // si la posicion de la mosca es menor que 0 entra 
      this.velY=this.velY*-1; // multiplicamos la velocidad por -1 para que vaya en sentido contrario 
   }// end if 
 
   firebase.database().ref("datosMosca/").update({ // inserto en la tabla datosMosca los siguientes valores
          
    posX:selvaX + this.x, // metemos en la variable de la bd la posicion actual de la msoca 
    posY: selvaY+this.y // metemos en la variable de la bd la posicion actual de la msoca 
    
  }); // fin update 

 
}; // fin metodo mover 


puntero= new puntero(50,200);  // creamos el objeto puntero


function puntero(X,Y){  // creamos la funcion de puntero 
    this.X=X; // creamos la propiedad de la pos x del puntero
    this.Y=Y; // creamos la propiedad de la pos y del puntero
    
    this.mover=function(event){ // creamos el metodo mover puntero 
        alto=$("#puntero").height()/3; // establecemos la altura del puntero y lo dividimos entre 3 porque sino se me descuadraba
        ancho=$("#puntero").width()/3;// establecemos la anchura  del puntero y lo dividimos entre 3 porque sino se me descuadraba

        

        firebase.database().ref(jugador).update({ // inserto en la tabla datosMosca los siguientes valores
          
          x:(event.clientX-ancho), // metemos en la variable x de la bd la posicion actual del puntero del eje x 
          y: (event.clientY-alto), // metemos en la variable y de la bd la posicion actual del puntero del eje y 
         
          
        }); // fin update 

       

       



        if ( event.clientY-alto<60  ){ // if que entra cuando la posicion del raton menos la altura del div del puntero sea menor que 60 entre 
          
          $("#puntero").attr("style"," position: absolute; top:200px; left:400px"); // ajustamos la posicion para que permanezca dentro de la selva
         } // end if 
         
       
         puntero.sobre(); // llamamos al metodo sobre del puntero

    } // end metodo mover

    
    this.sobre=function(){ // creamos el metodo sobre del puntero
      if (jugador=="jugador1/"){ // si la variable jugador es igual a jugador1/ entra 
        punterotemp="#puntero"; // cambiamos la variable punterotemp a #puntero cuando somo el jugador 1  para no repetir el proceso siguiente dos veces utilizamos esta variable para setear la id del puntero
        
      }else{
       
        punterotemp="#puntero2"; // seteamos la variable a #puntero2  cuando somos el jugador 2  
      } // end else 

       miraIzquierda=$(punterotemp).offset().left; // creamos la variable con las cordenadas del eje x del puntero 
       miraDerecha=miraIzquierda+$(punterotemp).width(); // creamos la variable con las cordenadas del eje x + el ancho del puntero  para tener el lado derecho del puntero 
    
       miraTop=$(punterotemp).offset().top; // creamos la variable con las cordenadas del eje y del puntero 
       moscaTop=$("#mosca").offset().top; // creamos la variable con las cordenadas del eje y de la mosca  
       miraTop2=miraTop + $(punterotemp).height(); // creamos una variable con la posicion del puntero del eje y + la altura de dicho puntero
       moscaTop2=moscaTop + $("#mosca").height(); // creamos una  variable con la posicion de la mosca del eje y + la altura de dicha mosca
    
       moscaIzquierda=$("#mosca").offset().left; // creamos una variable con la posicion del eje x de la mosca 
       moscaDerecha=moscaIzquierda + $("#mosca").width(); // creamos una variable con la posicion de antes + el ancho de la mosca 

    
          if (miraIzquierda<moscaIzquierda && miraDerecha>moscaDerecha && miraTop<moscaTop && miraTop2>moscaTop2){ // creamos un if para cuando el raton esta encima de la mosca entre 
             
            firebase.database().ref(jugador).update({ // inserto en la tabla datosMosca los siguientes valores
              estado:1  // cambiamos el estado a 1 de la columna de la bd 
              
            }); // fin update 
            
          } // end if 
          else{ // else 
            firebase.database().ref(jugador).update({ // inserto en la tabla datosMosca los siguientes valores 
              estado:0   // cambiamos el estado a 0 de la columna de la bd 
              
            }); // fin update 
          } // fin else 
      
      } // fin sobre 
    
       
} // fin puntero






     