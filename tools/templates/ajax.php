<?php

if($_POST['action']=='action_contactform')
{

	$body1="
					<br />
					New User want to contact to you from  your site.<br />
					<br />
					User details  are:<br />
					<br />
					 First Name : ".$_POST["fname"]."<br />
					 Last Name : ".$_POST["lname"]."<br />
					
					Email ID : ".$_POST["emailid"]."<br />
					phone No : ".$_POST["phoneno"]."<br />
					
					Zip code : ".$_POST["zipcode"]."<br />
				  Average Monthly Electric Bill : ".$_POST["bill"]."<br />
					<br />
					<br />
					";	
					
    $subject = " New user want to contact to you ";
	$to="lohiasales@gmail.com";	
	$headers = "MIME-Version: 1.0" . "\r\n";
		 $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		 $headers .= 'From: <http://themesmatrix.com/>' . "\r\n";
	 mail($to,$subject,$body1,$headers);
	 
	 
	
}




?>

