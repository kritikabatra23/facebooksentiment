var email = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;

function checkSubmit()
{
	if(checkUsername()&&checkPassword()&&checkEmail())
	{
		window.location.href='customer-orders.php';
	}
	else
	{
		alert("there are some error occur for your information")
	}
}

function checkUsername()
{
  console.log("checkusername is running");
  var name=document.getElementById("username").value.trim();
	if(name == "" || name == null)
	{
		document.getElementById("usernameError").innerHTML = "*Please write your username  ";
	}
	else
	{
        document.getElementById("usernameError").innerHTML="";
        return true;
  }
}

function checkEmail()
{
  var name=document.getElementById("useremail").value.trim();
	if(name == "" || name == null)
	{
		document.getElementById("emailError").innerHTML = "*Please write your email ";
	}
	else if(!email.test(name))
	{
		document.getElementById("emailError").innerHTML = "*Please write your email correctly";
	}
	else
	{
        document.getElementById("emailError").innerHTML="";
        return true;
    }

}

function checkPassword()
{
  var name=document.getElementById("password").value.trim();
  if(name == "" || name == null)
  {
  document.getElementById("passwordError").innerHTML = "*Please write your password";
  }
  else
  {
      document.getElementById("passwordError").innerHTML="";
      return true;
  }
}
