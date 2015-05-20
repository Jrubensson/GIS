<?php 


function relocate($url) { if ($url == -1) $url = $_SERVER['HTTP_REFERER'] ? $_SERVER['HTTP_REFERER'] : "/"; Header("Location: $url", true, 307); die(); }

function safepass($email, $password) {

          $return = $email.$password."73428944#€34€23€324#22!!sd34!";  
          $return = sha1($return);                        
          return $return;                                 
                             
}

#Kollar om användaren är inloggad
function login_check($mysqli) {
   // Check if all session variables are set
   if(isset($_SESSION['userID'], $_SESSION['login_string'])) {
     $login_string = $_SESSION['login_string'];
     $user = $_SESSION['userID'];
 
     $user_browser = $_SERVER['HTTP_USER_AGENT']; // Get the user-agent string of the user.
 
     if ($stmt = $mysqli->prepare("SELECT password FROM users WHERE ID = ? LIMIT 1")) { 
        $stmt->bind_param('s', $user); // Bind "$user_id" to parameter.
        $stmt->execute(); // Execute the prepared query.
        $stmt->store_result();
 
        if($stmt->num_rows == 1) { // If the user exists
           $stmt->bind_result($password); // get variables from result.
           $stmt->fetch();
           $login_check = safepass($password, $user_browser);
           if($login_check == $login_string) {
              // Logged In!!!!
              return true;

           } else {
              // Not logged in
              return false;

           }
        } else {
            // Not logged in
            return false;
        }
     } else {
        // Not logged in
        return false;
     }
   } else {
     // Not logged in
     return false;
   }
}


function sql($sql, $mysqli){
	try{ 
		$stmt = $mysqli->query($sql); //Preparerar queryn

		
		$arr = array();
		while($result = $stmt->fetch_array()){
			array_push($arr, $result);
		}

		$mysqli->close(); //Stänger databasuppkopplingen

		return $arr; //Returnerar resultatet

	}
	catch(Exception $e){
		$mysqli = NULL;
		throw new Exception("Error Processing Request", 1);
	}
}




?>