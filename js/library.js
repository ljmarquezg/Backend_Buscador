$(document).ready(function(){
  getCities();
  getTipo();
})


$('#mostrarTodos').on('click', function(){
  findAllItems()
})

$('#formulario').on('submit', function(event){
  event.preventDefault();
  var minimo = $('.irs-from').text(), //Obtener el precio mínimo
      maximo = $('.irs-to').text(), //Obtener el precio máximo
      rango = getPrices(minimo, maximo);
  filterPrice(rango);
})

function findAllItems(){
  $.ajax({
    url:'./showAll.php', //Realizar consulta al archivo showAll.php
    type: 'GET', //Utilizar el método GET
    data:{},
    success:function(items){ //Acciones a realizar si la ejecución es exitosa
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



function getCities(){
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

function getTipo(){
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

function filterPrice(rango){
  $.ajax({
    url:'./buscador.php', //Realizar consulta al archivo tipo.php
    type: 'POST', //Utilizar el metodo GET para obtener la infomación
    //dataType: 'json', //Definir el tipo de información como un objeto json
    data:{rango}, //Enviar la información con los rangos de precios.
    success:function(rango){
      alert(rango)
    },
    error: function(){
      alert('Error de Objeto: ' + rango[0])
    }
  })
}
