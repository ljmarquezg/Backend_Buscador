<?php
  require('./library.php');
  $filtroCiudad = $_GET['filtroCiudad'];
  $filtroTipo = $_GET['filtroTipo'];
  $filtroPrecio =  $_GET['filtroPrecio'];
  $getData = readData(); //Leer la informacion del archivo json.
  filterData($filtroCiudad, $filtroTipo, $filtroPrecio,$getData);
 ?>
