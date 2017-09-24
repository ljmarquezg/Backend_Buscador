<?php
  require('./library.php');
  $getRango =  $_POST['rango'];
  $getData = readData(); //Leer la informacion del archivo json.

  if(isset($_POST['city'])){
    echo $_POST['city'];
    $getCity = filterCity($getData);
    filterCity($getData, $getCity );
  }

  /*if(isset($_POST['ciudad'])){
    echo $_POST['tipo'].'el filtro de tipo esta vacio';
  }*/

  filterPrice($getData, $getRango);
  //getData('ciudad',readData())
 ?>
