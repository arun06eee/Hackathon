<?php

require_once("config.php");
require_once('class.phpmailer.php');
require_once('class.library.php');
include("class.smtp.php"); 

$array = [];

header('Content-type: application/json');
if(!empty($_REQUEST)&& !empty($_POST)) {
	$firstname = trim($_POST['firstname']);
	$lastname = trim($_POST['lastname']);
	$emailid = trim($_POST['emailid']);
	$phonenumber = trim($_POST['phonenumber']);
	$workexperience = trim($_POST['workexperience']);
	$city = trim($_POST['city']);
	$technologiesknown = trim($_POST['technologiesknown']);

	$sql = "INSERT INTO zydehacks_records (firstname, lastname, emailid, phonenumber, workexperience, city, technologiesknown, updated_dateTime)
			VALUES ('$firstname', '$lastname', '$emailid', '$phonenumber', '$workexperience', '$city', '$technologiesknown', now())";

	if ($conn->query($sql) === TRUE) {
		$mail = new PHPMailer(true);
		$mail->IsSMTP();

		$body = file_get_contents("mail.html");
		try {
			$mail->SMTPDebug  = false;
			$mail->SMTPAuth   = true;
			$mail->SMTPSecure = SMTP_SECURE;
			$mail->Host       = SMTP_HOST;
			$mail->Port       = SMTP_PORT;
			$mail->SMTPKeepAlive = true;
			$mail->Mailer = "smtp";
			$mail->Username   = SMTP_UNAME;
			$mail->Password   = SMTP_PWORD;
			$mail->AddAddress( $emailid, $firstname." ".$lastname);
			$mail->SetFrom("zydehacks@zydesoft.com", 'Zydehacks');
			$mail->Subject = 'Zydehacks Online Challenge';
			$mail->MsgHTML($body);
			$mail->Send();

			$array['status'] = "Success";
			$array['message'] = "Thank you for taking interest in '#ZYDEHACKS Online Challenge'. <br/> A Challenge Statement has been sent to your Mail.";
		} catch (phpmailerException $e) {
			$array['status'] = "Failed";
			$array['message'] = "Error: ". $e->errorMessage();
		} catch (Exception $e) {
			$array['status'] = "Failed";
			$array['message'] = "Error: ". $e->errorMessage();
		}	
	} else {
		$array['status'] = "Failed";
		$array['message'] = "Error: ". $conn->error;
	}

	$conn->close();

	print_r(json_encode($array));
}else {
	$array['status'] = "Failed";
	$array['message'] = "Page Not Found";
	print_r(json_encode($array));
}

?>