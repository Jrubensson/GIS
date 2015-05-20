<?php
	header('Content-Type: application/json; charset=utf-8');

	//Hämtar alla våra controllers
	require "controllers/mainCtrl.php";

	session_start();

	//Hämtar hjälpfunktioner
	require("models/functions.php");

	$query = explode("/", $_SERVER['REQUEST_URI']);//Exploderar URLen

	$controller = new $query[3](); //Skapar upp vår controller från första platsen

	if(method_exists($controller, $query[4])){ //Kollar om funktionen finns i controller
		

		if(!empty($query[5])){ //Om $query4 är tom så har vi ingen parameter med in i funktionen
			echo json_encode($controller->$query[4]($query[5]));
		}
		else{ //Annars skickar vi in parametern också
			echo json_encode($controller->$query[4]());
		}
	}
	else{
		echo "Undefined function.";
	}



?>