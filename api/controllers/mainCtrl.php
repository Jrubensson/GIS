<?php 

require_once "models/userModel.php";
/**
* Controller for Users
*/
class Main
{
	//Our model for the users
	private $model;

	function __construct()
	{
		$this->model = new Locations();
	}

	function getLocations(){
		return $this->model->getLocations();
	}

	function newLocation(){
		return $this->model->newLocation();
	}

}


?>