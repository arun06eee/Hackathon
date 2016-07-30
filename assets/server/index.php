<?php

require_once("config.php");

$array = [];

header('Content-type: application/json');

if(isset($_REQUEST) && isset($_POST)) {
	$firstname = trim($_POST['firstname']);
	$lastname = trim($_POST['lastname']);
	$emailid = trim($_POST['emailid']);
	$phonenumber = trim($_POST['phonenumber']);
	$workexperience = trim($_POST['workexperience']);
	$city = trim($_POST['city']);
	$technologiesknown = implode(", ", $_POST['technologiesknown']);

	$sql = "INSERT INTO zydehacks_records (firstname, lastname, emailid, phonenumber, workexperience, city, technologiesknown, updated_dateTime)
			VALUES ('$firstname', '$lastname', '$emailid', '$phonenumber', '$workexperience', '$city', '$technologiesknown', now())";

	if ($conn->query($sql) === TRUE) {
		$array['status'] = "Success";
		$array['message'] = "record created successfully";
	} else {
		$array['status'] = "Failed";
		$array['message'] = "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();

	print_r(json_encode($array));
}else {
	$array['status'] = "Failed";
	$array['message'] = "Page Not Found";
	print_r(json_encode($array));
}

?>