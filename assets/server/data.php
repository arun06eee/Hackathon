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
	$row = []; $total = 0;
	$sql = "select * from zydehacks_records ORDER by ID $order LIMIT $limit OFFSET $offset";

	$sqlCount = "select count(*) as records from zydehacks_records";

	$data = $conn->query($sql);

	if(!$data) {
		$array['status'] = "Failed";
		$array['message'] = "Unable to find Records";
	} else {
		while($content = $data->fetch_assoc()){
			array_push($row, $content);
		}

		$countData = $conn->query($sqlCount);
		if($countData) {
			$total = $countData->fetch_assoc()['records'];
		}
		
		$array['total'] = $total;
		$array['rows'] = $row;

		print_r(json_encode($array));
		
	}
}
?>