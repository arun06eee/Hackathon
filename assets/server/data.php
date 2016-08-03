<?php


// Start the session
session_start();

require_once("config.php");


//header('Content-type: application/json');

$array = [];

if($_SESSION["Zyde_username"]) {
	
	$offset = $_GET['offset'];
	$order = $_GET['order'];
	$limit = $_GET['limit'];
	$row = [];
	$sql = "select * from zydehacks_records ORDER by ID $order LIMIT $limit OFFSET $offset";

	$data = $conn->query($sql);

	if(!$data) {
		$array['status'] = "Failed";
		$array['message'] = "Unable to find Records";
	} else {
		
		array_push($row, $data->fetch_assoc() );
		
		print_r($row);
		$array['total'] = 100;
		$array['rows'] = $row;
		
		print_r(json_encode($array));
		
	}
	
	
}
?>