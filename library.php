
<?php

function readData(){
  $data_file = fopen('./data-1.json', 'r'); //Abrir el archivo json
  $data = fread($data_file, filesize('./data-1.json')); //Leer el contenido del archivo y obtener su tamaño
  $data = json_decode($data, true); //Convertir el contenido en formato JSON
  fclose($data_file); //Cerrar el archivo para no consumir innecesariamente recursos del servidor
  return ($data);
};

function getData($filter, $data){
  $itemList = Array();
    foreach ($data as $index => $item) {
      array_push($itemList, $item); //Agregar los valores obtenidos al vector items
    }
    echo json_encode($itemList); //Devolver el arreglo en formato JSON
};

/*Inicializar los input select*/
function getCities($getData){
  $getCities = Array(); //Crear una matriz para evitar repetir ciudades
  foreach ($getData as $cities => $city) { //Recorrer la información
    if(in_array($city['Ciudad'], $getCities)){ //Verificar si el valor existe en el array
      //Continuar
    }else{
      array_push($getCities, $city['Ciudad']); //Agregar la ciudad a la matriz
    }
  }
  echo json_encode($getCities);
}

function getTipo($getData){
  $getTipo = Array(); //Crear una matriz para evitar repetir ciudades
  foreach ($getData as $tipos => $tipo) { //Recorrer la información
    if(in_array($tipo['Tipo'], $getTipo)){ //Verificar si el valor existe en el array
      //Continuar
    }else{
      array_push($getTipo, $tipo['Tipo']); //Agregar la ciudad a la matriz
    }
  }
  echo json_encode($getTipo);
}

function filterData($filtroCiudad, $filtroTipo, $filtroPrecio,$data){
  $itemList = Array();

  if($filtroCiudad == "" and $filtroTipo=="" and $filtroPrecio==""){ //Si se presiona el boton mostrar todos
    foreach ($data as $index => $item) {
      array_push($itemList, $item); //Agregar los valores obtenidos al vector items
    }
  }else{ //Si se presiona el boton buscar. NOTA: El campo precio siempre tendra un valor.

    $menor = $filtroPrecio[0]; //Obtener el valor menor del rango de precios
    $mayor = $filtroPrecio[1]; //Obtener el valor mayor del rango de precios

      if($filtroCiudad == "" and $filtroTipo == ""){ //Verificar que los filtros ciudad y tipo estén vacios
        foreach ($data as $items => $item) {
            $precio = $item['Precio'];
        if ( $precio >= $menor and $precio <= $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
            array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
          }
        }
      }

      if($filtroCiudad != "" and $filtroTipo == ""){ //Comparar si el precio se encuentra dentro de los valores del filtro
          foreach ($data as $index => $item) {
            $precio = $item['Precio'];
            if ($filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
              array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
            }
        }
      }

      if($filtroCiudad == "" and $filtroTipo != ""){ //Comparar si el precio se encuentra dentro de los valores del filtro
          foreach ($data as $index => $item) {
            $precio = $item['Precio'];
            if ($filtroTipo == $item['Tipo'] and $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
              array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
            }
        }
      }

      if($filtroCiudad != "" and $filtroTipo != ""){ //Comparar si el precio se encuentra dentro de los valores del filtro
          foreach ($data as $index => $item) {
            $precio = $item['Precio'];
            if ($filtroTipo == $item['Tipo'] and $filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
              array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
            }
        }
      }


  }
  echo json_encode($itemList); //Devolver el arreglo en formato JSON
};


function findAllItems(){
  $data = getData('', readData());
  foreach ($data as $index => $item) {
    array_push($itemList, $item); //Agregar los valores obtenidos al vector items
  }
}
/*function filterPrice($data, $menor, $mayor, $itemList){

  return $itemList; //Devolver el array itemList
}*/
/*
function filterCity($data, $menor, $mayor, $itemList){
  foreach ($data as $index => $item) {
    $precio = $item['Precio'];
    if ($filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
        array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
      }
  }
  return $itemList; //Devolver el array itemList
}
/*Funciones de filtros*/

/*function filterPrice($data, $rango, $ciudad, $tipo){
  $menor = $rango[0]; //Obtener el valor menor del rango de precios
  $mayor = $rango[1]; //Obtener el valor mayor del rango de precios

  echo "Ciudad:".$ciudad;
  $itemList = Array();
  foreach ($data as $items => $item) {
    $precio = $item['Precio'];
    if($ciudad == "" and $tipo == ""){
      if ( $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
        array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
      }
    }else{
      if($ciudad != "" and $tipo == "" and $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
        array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
      }
    }

  }
  echo json_encode($itemList);
}
*/
/*
function filterPrice($data, $rango, $ciudad, $tipo){
  $menor = $rango[0]; //Obtener el valor menor del rango de precios
  $mayor = $rango[1]; //Obtener el valor mayor del rango de precios
  $filtroCiudad = $ciudad;
  $filtroTipo = $tipo;

  $itemList = Array();
  foreach ($data as $items => $item) {
    $precio = $item['Precio'];
    if ( $precio > $menor and $precio < $mayor){ //Comparar si el precio se encuentra dentro de los valores del filtro
      //array_push($itemList,$item ); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
      echo $filtroCiudad;
    }
  }
  //echo json_encode($itemList);
}
*/
/*function filterCity($data){
  $cityMatch = $_GET['ciudad'];
  //echo $cityMatch;
  $cityList = Array();
  foreach ($data as $cities => $city) {
    if ( $cityMatch == $city['Ciudad']){ //Comparar si el precio se encuentra dentro de los valores del filtro
      array_push($cityList, $city); //Devolver el objeto cuyo precio se encuentra dentro del rango establecido.
    }
  }
  echo json_encode($cityList);
}*/


?>
