// to prevent the hack extension on file irrelevant php
<?php

$siteOwnersEmail = 'vijayrauniyar1818@gmail.com';

if($_POST) {

   $name = trim(stripslashes($_POST['Name']));

   $email = trim(stripslashes($_POST['Email']));

   $subject = trim(stripslashes($_POST['Subject']));

   $contact_message = trim(stripslashes($_POST['Message']));

   // Check Name

	if (strlen($name) < 2) {		$error['name'] = "Please enter your name.";

	}

	// Check Email

	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {

		$error['email'] = "Please enter a valid email address.";

	}

	// Check Message

	if (strlen($contact_message) < 15) {

		$error['message'] = "Please enter your message. It should have at least 15 characters.";

	}

   // Subject

	if ($subject == '') { $subject = "Contact Form Submission"; }

   // Set Message

   $message .= "Email from: " . $name . "<br />";

	$message .= "Email address: " . $email . "<br />";

   $message .= "Message: <br />";

   $message .= $contact_message;

   $message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";

   // Set From: header

   $from =  $name . " <" . $email . ">";

   // Email Headers

	$headers = "From: " . $from . "\r\n";

	$headers .= "Reply-To: ". $email . "\r\n";

 	$headers .= "MIME-Version: 1.0\r\n";

	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   if (!$error) {

      ini_set("sendmail_from", $siteOwnersEmail); // for windows server

      $mail = mail($siteOwnersEmail, $subject, $message, $headers);

		if ($mail) { echo "OK"; }

      else { echo "Something went wrong. Please try again."; }

		

	} # end if - no validation error

	else {

		$response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;

		$response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;

		$response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;

		

		echo $response;

	} 

}

?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>Write-My-Text</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css" />
	<link rel="stylesheet" href="https://milligram.io/styles/main.css" />
	<link rel="stylesheet" href="style.css" />
</head>

<body>
	<div class="row" style="max-width: 99vw;">
		<div class="column">
			<section class="container" id="examples">
				<h3 id="title"><u>Enter Your Text Here:</u></h3>
				<form onsubmit="return false">
					<fieldset>
						<textarea placeholder="Your text Here" id="dataField"
							onkeyup="textChanged(this.value)"></textarea>
					</fieldset>
				
					<div class="row">

							<a href="#" class="rainbow-button" id="b1" onclick="incrementor()" alt="Change Handwriting"></a>
							<a href="#" class="rainbow-button" id="b2" onclick="save(str(pageNum++))" alt="Download Your Page"></a>
						

					
					</div>
					<br>
					<div class="row">
						<div class="column">
							<label>Margin X-axix</label>
							<input type="range" min="1" max="200" value="20" oninput="xaxis=float(this.value); loop();"
								class="slider" />
						</div>
						<div class="column">
							<label>Margin Y-axix</label>
							<input type="range" min="1" max="200" value="20" oninput="yaxis=float(this.value); loop();"
								class="slider" />
						</div>
						<div class="column">
							<label>Font Size</label>
							<input type="range" min="0.05" max="5" value="1" step="0.1"
								oninput="fontsize=float(this.value); loop();" class="slider" />
						</div>
						<div class="column">
							<label>Width</label>
							<input type="range" min="100" max="800" value="700" oninput="w=float(this.value); loop();"
								class="slider" />
						</div>
						<div class="column">
							<label>Line Gap</label>
							<input type="range" min="50" max="150" value="60"
								oninput="linespacing=float(this.value); loop();" class="slider" />
						</div>
					</div>
				</form>
			</section>
		</div>
		
		<div class="column">
			<div id="contributing"></div>
		</div>
	</div>
	</main>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
	<script src="script.js"></script>

</body>

</html>
