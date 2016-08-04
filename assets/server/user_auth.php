<?php

// Start the session
session_start();

require_once("config.php");

$array = [];

header('Content-type: application/json');

if(isset($_REQUEST) && isset($_POST)) {
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);

	$sql = "select * from zydehacks_user where username='$username' AND password='".md5($password)."'";

	$data = $conn->query($sql);

	if(!$data) {
		$array['status'] = "Failed";
		$array['message'] = "Unable to find Records";
	} else {
		$a = $data->num_rows;

		if($a >= 1) {
			$_SESSION["Zyde_username"] = $username;

			$array['status'] = "Success";
			$array['message'] = "successfully login";
		}else {
			$array['status'] = "Failed";
			$array['message'] = "Unable to find Records";
		}
	}

	$conn->close();

	print_r(json_encode($array));
}else {
	$array['status'] = "Failed";
	$array['message'] = "Page Not Found";
	print_r(json_encode($array));
}

?>