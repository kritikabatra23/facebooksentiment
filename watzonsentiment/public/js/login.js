function userLogin()
{
  if(checkLoginSubmit())
  {

//connect database and get the array of the username and the password from database
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();

    var dataEmail = [];
    var dataPassword = [];

    for(var i = 0; i<dataEmail.length; i++){
      if(dataEmail[i] == email){
        if(dataPassword[i] == password){
          window.location.href = index.html;
        }
        else{
          alert("wrong password!")
        }
      }
      else{
        alert("wrong email! Please try again or sign up for your new account")
      }
    }
  }
}

function checkLoginSubmit(){
  var email = $('#loginEmail').val();
  var password = $('#loginPassword').val();
  if(email == null || email == ""){
    document.getElementById("loginEmailError").innerHTML = "*Please write your email  ";
    return false;
  }
  else if (password == null || password == ""){
    document.getElementById("loginPasswordError").innerHTML = "*Please write your email  ";
    return false;
  }
  else {
    return true;
  }
}
