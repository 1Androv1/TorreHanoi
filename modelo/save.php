<?php 
$servidor = "localhost";
$usuario = "root";
$contraseña = "12345";
$bd = "towerhanoi";

$conexion = mysqli_connect($servidor,$usuario,$contraseña);

if (!$conexion) {
	die('<strong>No se conecto:</strong>'.mysqli_error());
}else{
	echo 'conectado satisfactoriamente al servidor <br />';
}

mysqli_select_db($bd, $conexion) or die(mysqli_error($conexion));
?>