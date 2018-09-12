//save the information of the users
var userInfo=[];
function saveUser()
{
  // console.log(userInfo);
  /********************** This part is temporary save the user information and wait for the database connection to save the data**********************************************/

  // userInfo[userInfo.length-1].userId = userInfo.length;
  // userInfo[userInfo.length-1].userName = document.getElementById("username").value;
  // userInfo[userInfo.length-1].userEmail = document.getElementById("useremail").value;
  // userInfo[userInfo.length-1].userPassword = document.getElementById("password").value;

/*******************This part save all the user information but i think it will be too complex if there is too many users. So it is better to have a database connection**********/

  var userTempInfo=
  {
    userId:"",
    userName:"",
    userPassword:"",
    userEmail:""
  }

  userTempInfo.userId = userInfo.length;
  userTempInfo.userName = document.getElementById("username").value;
  userTempInfo.userEmail = document.getElementById("useremail").value;
  userTempInfo.userPassword = document.getElementById("password").value;
  console.log(userTempInfo);
  userInfo.push(userTempInfo);
  console.log(userInfo);

}
