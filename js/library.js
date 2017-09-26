$(function(){
  getCities(); //Obtener los valores de las ciudades e incluirlos en el campo select #selectCiudad
  getTipo(); //Obtener los valores de las ciudades e incluirlos en el campo select #selectTipo
})


$('#mostrarTodos').on('click', function(){
  $('.progress').show() //Mostrar la barra de progreso mientras se genera la búsqyeda
  buscarItem(false); //Pasar a la funcion buscarItem el parametro false para indicar que no se utilizará filtro
})

$('#formulario').on('submit', function(event){
  event.preventDefault(); //Prevenir que se ejecute la acción por defecto al hacer submit del formulario
  $('.progress').show() //Mostrar la barra de progreso mientras se genera la búsqyeda
  buscarItem(true); //Pasar a la funcion buscarItem el parametro false para indicar que se utilizará filtro
})

/*Lenar los input select con los valores correspondientes*/
function getCities(){ //Agregar las ciudades al input selectCiudad
  $.ajax({
    url:'./cities.php', //Realizar consulta al archivo cities.php
    type: 'GET', //Utilizar el metodo GET para obtener la infomación
    data:{}, //no enviar parámetros para la consulta
    success:function(cityList){   //Acciones a realizar si la ejecución es exitosa
      var cityList = JSON.parse(cityList) //Convertir formato JSON en un objeto JavaScript
      $.each(cityList, function( index, value ) { //Recorrer el array y agregar los valores al input select
        $('#selectCiudad').append('<option value="'+value+'">'+value+'</option>')  //Aagregar los valores al input select
      });
    }
  }).done(function(){
    $('select').material_select();///Una vez completada la funcion anterior enderizar el campo select
  })
}

function getTipo(){ //Agregar el tipo de item al input selectTipo
  $.ajax({
    url:'./tipo.php', //Realizar consulta al archivo tipo.php
    type: 'GET', //Utilizar el metodo GET para obtener la infomación
    data:{}, //no enviar parámetros para la consulta
    success:function(tipoList){ //Acciones a realizar si la ejecución es exitosa
      var tipoList = JSON.parse(tipoList) //Convertir formato JSON en un objeto JavaScript
      $.each(tipoList, function( index, value ) { //Recorrer el array
        $('#selectTipo').append('<option value="'+value+'">'+value+'</option>')  //Aagregar los valores al input select
      });
    }
  }).done(function(){
    $('select').material_select(); //Una vez completada la funcion anterior Renderizar el campo select
  })
}

function buscarItem(filter){
  if($('.colContenido > .item') != 0){ //Verificar que no se haya realiado una consulta previamente
    $('.colContenido > .item').detach() //De haber items en la lista, eliminarlos con la función detach para evitar perder las propiedades de los objetos
  }

  var rango = $('#rangoPrecio').val(), //Obtener los valores maximos y minimos del input
      rango = rango.split(";") //separar los valores en un array

  var filtro = { //Crear el objeto filtro
        Precio: rango, //Asignar el valor del rango de precios
        Ciudad: $('#selectCiudad option:selected').val(), //Asignar el valor de la ciudad seleccionada
        Tipo: $('#selectTipo option:selected').val() //Asignar el valor del tipo seleccionado
      }

      if (filter == false){ //Verificar si no se aplicaran filtros
        filtro.Ciudad = '' //Asignar valores vacios
        filtro.Tipo = '' //Asignar valores vacios
        filtro.Precio = '' //Asignar valores vacios
      }

  $.ajax({
    url:'./buscador.php', //Realizar consulta al archivo buscador.php
    type: 'GET', //Utilizar el metodo GET para obtener la infomación
    //data:{filtroPrecio, filtroCiudad, filtroTipo}, //Enviar la información con los rangos de precios.
    data:{filtro}, //Enviar la información de los filtros.
    success:function(items){ //Acciones a realizar si la ejecución es exitosa
      var item = JSON.parse(items) //Convertir formato JSON en un objeto JavaScript
      $.each(item, function(index, item){ //Recorrer el objeto y agregarlos al con clase .colContenido
        $('.colContenido').append( //Anexar los items que correspondan al filtro consultado
            '<div class="col s12 item">'+
              '<div class="card itemMostrado">'+
                '<img src="./img/home.jpg">'+
                  '<div class="card-stacked">'+
                    '<div class="card-content">'+
                      '<p><b>Direccion: </b>'+item.Direccion+'</p>'+ //Obtener el valor de la propiedad Direccion del objeto
                      '<p><b>Ciudad: </b>'+item.Ciudad+'</p>'+ //Obtener el valor de la propiedad Ciudad del objeto
                      '<p><b>Teléfono: </b>'+item.Telefono+'</p>'+ //Obtener el valor de la propiedad Teléfono del objeto
                      '<p><b>Código postal: </b>'+item.Codigo_Postal+'</p>'+ //Obtener el valor de la propiedad Código Postal del objeto
                      '<p><b>Tipo: </b>'+item.Tipo+'</p>'+ //Obtener el valor Tipo del  objeto
                      '<p><b>Precio: </b><span class="precioTexto">'+item.Precio+'</span></p>'+ //Obtener el valor de la propiedad Precio del objeto
                    '</div>'+
                    '<div class="card-action">'+
                    '<a href="#">Ver más</a>'+
                  '</div>'+
                '</div>'+
              '</div>'+
          '</div>'
        )
      })
    },
    error: function(){ //Acciones al producirse un error
      $('#error').openModal() //Abrir el modal Error
      $('.progress').hide() //Ocultar la barra de progreso de busqueda
    }
  }).done(function(){
    var totalItems = $('.colContenido > .item').length //Contar cuantos items devuelve la consulta
    $('.tituloContenido.card > h5').text("Resultados de la búsqueda: "+ totalItems + " items" ) //Mostrar la cantidad de items devueltos por la consulta
    $('.progress').hide() //Ocultar la barra de progreso de busqueda
  })
}
