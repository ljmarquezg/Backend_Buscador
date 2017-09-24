<?php
  require('./library.php');
  $getData = readData(); //Leer la informacion del archivo json.
  $getRango = getPrices();

  if(isset($_GET['ciudad'])){
    $getCity = getCity($getData);
    getCity($getData, $getCity );
  }

  if(isset($_GET['ciudad'])){
    echo $_POST['tipo'].'el filtro de tipo esta vacio';
  }


  filterPrice($getData, $getRango);
 ?>
