<?php

// Put contacting email here
$main_email 	= "example@gmail.com";


//Fetching Values from URL
$name 			= $_POST['xx_name'];
$email 			= $_POST['xx_email'];
$message 		= $_POST['xx_message'];


//Sanitizing email
$email 			= filter_var($email, FILTER_SANITIZE_EMAIL);


//After sanitization Validation is performed
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
	
	
		$subject = "Message from contact form";
		
		// To send HTML mail, the Content-type header must be set
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'From:' . $email. "\r\n"; // Sender's Email
		$headers .= 'Cc:' . $email. "\r\n"; // Carbon copy to Sender
		
		$template = '<div>Hello ' . $name . ',<br/>'
		. 'Thank you for contacting us.<br/><br/>'
		. '<strong>Name:</strong>  ' . $name . '<br/>'
		. '<strong>Email:</strong>  ' . $email . '<br/>'
		. '<strong>Message:</strong>  ' . $message . '<br/><br/>'
		. 'This is a Contact Confirmation mail.'
		. '<br/>'
		. 'We will contact you as soon as possible .</div>';
		$sendmessage = "<div>" . $template . "</div>";
		
		// message lines should not exceed 70 characters (PHP rule), so wrap it
		$sendmessage = wordwrap($sendmessage, 70);
		
		// Send mail by PHP Mail Function
		mail($main_email, $subject, $sendmessage, $headers);
		echo "";
	
	
} else {
	echo "<span class='contact_error'>* Invalid email *</span>";
}

?>