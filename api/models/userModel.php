<?php 

/**
* Model for users in play-site
*/

class Locations
{
	private $mysqli;
	function __construct()
	{
		$this->db_host = "localhost";
		$this->db_user = "root"; 
		$this->db_password = "root";
		$this->db_use = 'GIS';

		$this->openConnection();
		
		//If you need login
		/*if(login_check($this->mysqli)){
			$this->user = $_SESSION['userID'];
		}*/

	}

	function __destroy(){
		$this->mysqli->close();
	}

	private function openConnection(){
		try{
			$this->mysqli = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_use);
			if($this->mysqli->connect_error){
			    //mail("johannes@staylive.se", "Error at StayLive database", $mysqli->connect_error);
			  }
			$this->mysqli->set_charset("utf8");

		}
		catch(PDOException $e){
			$this->con = NULL;
			throw new Exception("Could not start database connection!");
		}
	}

	public function getLocations(){
		$result = sql("SELECT lat, lng, author, description, name, added, ID FROM locations", $this->mysqli); //Vår query för att hämta sändningar
		return $result;
		
	}

	public function newLocation(){
		//Gather the incoming values from the form
		$pin_name = $_POST['pin-name'];
		$author = $_POST['author'] ?: 'En okänd filur';
		$description = $_POST['description'];
		$lat = $_POST['lat'];
		$lng = $_POST['lng'];

		//Prepare the statement
		$stmt = $this->mysqli->prepare("INSERT INTO locations (lat, lng, author, description, name) VALUES(?, ?, ?, ?, ?);");
		
		//Bind variabler till vårt statement
		$stmt->bind_param('ddsss', $lat, $lng, $author, $description, $pin_name);

		//Utför queryn
		$stmt->execute();
	}



}//Class end



?>