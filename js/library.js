$(document).ready(function(){
  getCities();
  getTipo();
})


$('#mostrarTodos').on('click', function(){
  filterPrice(false); //Pasar a la funcion filterPrice el parametro false para indicar que no se utilizará filtro
})

$('#formulario').on('submit', function(event){
  event.preventDefault(); //Prevenir que se ejecute la acción por defecto al hacer submit del formulario
  filterPrice(true); //Pasar a la funcion filterPrice el parametro false para indicar que se utilizará filtro
})

function findAllItems(){
  $.ajax({
    url:'./showAll.php', //Realizar consulta al archivo showAll.php
    type: 'GET', //Utilizar el método GET
    data:{},
    success:function(items){ //Acciones a realizar si la ejecución es exitosa
      alert(items)
      var item = JSON.parse(items) //Convertir formato JSON en un objeto JavaScript
      $.each(item, function(index, item){ //Recorrer el objeto y agregarlos al con clase .colContenido
        $('.colContenido').append(
          '<div class="col s12">'+
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
    }
  })
}

/*Lenar los input select con los valores correspondientes*/
function getCities(){ //Agregar las ciudades al input selectCiudad
  $.ajax({
    url:'./cities.php', //Realizar consulta al archivo cities.php
    type: 'GET', //Utilizar el metodo GET para obtener la infomación
    data:{},
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
    data:{},
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

function getPrices(maximo, minimo){
  var rangoPrecios = []
  rangoPrecios[0] = maximo
  rangoPrecios[1] = minimo
  return rangoPrecios; //Debolver el objeto
}

function filterPrice(filter){
  var minimo = $('.irs-from').text(), //Obtener el precio mínimo
      maximo = $('.irs-to').text(), //Obtener el precio máximo
      filtroPrecio = getPrices(minimo, maximo),
      filtroCiudad = $('#selectCiudad option:selected').val()
      filtroTipo = $('#selectTipo option:selected').val()

      alert(minimo + " - " + maximo)

      if (filter == false){
        filtroCiudad = ''
        filtroTipo = ''
        filtroPrecio = ''
      }

  $.ajax({
    url:'./buscador.php', //Realizar consulta al archivo tipo.php
    type: 'GET', //Utilizar el metodo GET para obtener la infomación
    //dataType: 'json', //Definir el tipo de información como un objeto json
    data:{filtroPrecio, filtroCiudad, filtroTipo}, //Enviar la información con los rangos de precios.
    success:function(items){ //Acciones a realizar si la ejecución es exitosa
      if($('.colContenido > .item') != 0){ //Verificar que no se haya realiado una consulta previamente
        $('.colContenido > .item').detach() //De haber items en la lista, eliminarlos con la función detach para evitar perder las propiedades de los objetos
      }
      alert(items)
      var item = JSON.parse(items) //Convertir formato JSON en un objeto JavaScript
      $.each(item, function(index, item){ //Recorrer el objeto y agregarlos al con clase .colContenido
        $('.colContenido').append(
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
    error: function(){
      alert('Se ha producido un error al procesar su consulta')
    }
  }).done(function(){
    var totalItems = $('.colContenido > .item').length
    $('.tituloContenido.card > h5').text("Resultados de la búsqueda: "+ totalItems + " items" )
  })
}
