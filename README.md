<!DOCTYPE html>
<html>
	<head>
		<title>
			Sign-in Page
		</title>
        <link rel = "stylesheet" href = "UI/styles.css">
	</head>
	<body>

		<div class = 'sign-up-image'>
		</div>

		<div class = 'signup-container'>
			<div class = 'signup-content'>
				<h1>Quick Credit</h1>
				<h3>Welcome back! Please sign-in to your account</h3>
				<form action='.UI/pages/dashboard.html'>
				  <label for = 'signup-email'><p>email address</p></label>
				  <input type = 'email' name = 'email' id = 'signup-email'><br />
				  <label for = 'signup-password'><p>password</p></label>
				  <input type = 'password' name = 'password' id = 'signup-password'><br />
				  <input type="submit" value="Sign in" class = 'btn'>
				</form>
				<p class = 'sign-in-alt'><a href="UI/pages/signup.html" >Don't have an account? sign up</a></p>
	
			</div>
		</div>
	</body>
</html>
